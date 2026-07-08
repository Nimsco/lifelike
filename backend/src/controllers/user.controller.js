import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import fs from "fs";

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

    const { email, username, password, dob, gender, bio } = req.body;

    if (
        [email, username, password, dob, gender].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if (bio.trim().length > 100)
        throw new ApiError(400, "Bio cannot exceed 100 characters.");

    if (!email.includes("@"))
        throw new ApiError(400, "Email must contain @ symbol");

    if (password.length <= 4)
        throw new ApiError(400, "Password must be at least 5 characters long.");

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
            username,
            password,
            dob,
            gender,
            bio,
            avatar: {
                url: avatar.secure_url,
                public_id: avatar.public_id,
            },
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken",
        );

        if (!createdUser)
            throw new ApiError(
                500,
                "Something went wrong while registering user",
            );

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    createdUser,
                    "User registered successfully",
                ),
            );
    } catch (error) {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        throw new ApiError(
            error?.statusCode || 500,
            error?.message || "Something went wrong while registering user",
        );
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

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!newPassword?.trim())
        throw new ApiError(400, "New password is required");

    if (newPassword.length <= 4)
        throw new ApiError(400, "Password must be at least 5 characters long.");

    if (newPassword !== confirmPassword)
        throw new ApiError(
            400,
            "The confirm password field does not match the new password.",
        );

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User successfully fetched"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { bio } = req.body;
    if (!bio) throw new ApiError(400, "All fields are required.");

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                bio,
            },
        },
        { new: true },
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account details updated successfully"),
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing.");
    const prevAvatarId = req.user?.avatar.public_id;

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.secure_url)
        throw new ApiError(400, "Error while uploading on avatar.");

    if (prevAvatarId) {
        await deleteFromCloudinary(prevAvatarId);
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: {
                    url: avatar.secure_url,
                    public_id: avatar.public_id,
                },
            },
        },
        { new: true },
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully."));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) throw new ApiError(400, "Username is missing");

    const profile = await User.aggregate([
        {
            $match: {
                username: username,
            },
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "following",
                as: "followers", //gives the followers of users
            },
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "follower",
                as: "following", //gives the users the user is following to
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "author",
                as: "userPosts",
            },
        },
        {
            $addFields: {
                followersCount: {
                    $size: "$followers",
                },
                followingCount: {
                    $size: "$following",
                },
                numberOfPosts: {
                    $size: "$userPosts",
                },
                isFollowed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$followers.follower"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                username: 1,
                followersCount: 1,
                followingCount: 1,
                numberOfPosts: 1,
                isFollowed: 1,
                avatar: 1,
                createdAt: 1,
            },
        },
    ]);

    if (!profile?.length) throw new ApiError(404, "User does not exist.");
    console.log(profile);

    return res
        .status(200)
        .json(new ApiResponse(200, profile[0], "User fetched successfully."));
});

const getPostWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id),
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "postWatchHistory",
                foreignField: "_id",
                as: "postWatchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "author",
                            foreignField: "_id",
                            as: "author",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            author: {
                                $first: "$owner",
                            },
                        },
                    },
                ],
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].postWatchHistory,
                "User post watch history fetched successfully.",
            ),
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getUserProfile,
    getPostWatchHistory,
};
