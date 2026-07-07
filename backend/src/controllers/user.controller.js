import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import fs from "fs"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token",
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    //take user input
    //check if email is duplicate
    //check if password is valid
    //check if username is duplicate
    //check for profilePic
    //upload pic to cloudinary
    //encrypt the password
    //give user jwt token
    //save user data in database
    //send response : remove password and refresh token
    //check for user creation

    const { email, username, password, dob, gender } = req.body;

    if (
        [email, username, password, dob, gender].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if (!email.includes("@"))
        throw new ApiError(400, "Email must contain @ symbol");

    if (password.length <= 4)
        throw new ApiError(400, "Password must be at least 4 characters long.");

try {
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });
    
        if (userExists) throw new ApiError(409, "User already exists");
    
        let avatarUrl = null;
    
        if (req.file?.path) {
            const avatar = await uploadOnCloudinary(req.file.path);
            avatarUrl = avatar.secure_url;
        }
    
        const user = await User.create({
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password,
            dob,
            gender,
            avatar: avatarUrl,
        });
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken",
        );
    
        if (!createdUser)
            throw new ApiError(500, "Something went wrong while registering user");
    
        return res
            .status(201)
            .json(
                new ApiResponse(201, createdUser, "User registered successfully"),
            );
} catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)){
        fs.unlinkSync(req.file.path)
    }
    throw new ApiError(error.statusCode || 500, error?.message || "Something went wrong while registering user")
}
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email)
        throw new ApiError(400, "username or email is required.");

    if (!password) throw new ApiError(400, "Password is required.");

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) throw new ApiError(404, "user does not exist.");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
        user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully",
            ),
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRequestToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRequestToken) throw new ApiError(401, "Unauthorized request");

    try {
        const decodedToken = jwt.verify(
            incommingRequestToken,
            process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) throw new ApiError(401, "Invalid refresh token");

        if (incommingRequestToken !== user?.refreshToken)
            throw new ApiError(401, "Refresh token is expired or used");

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshTokenefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed",
                ),
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
