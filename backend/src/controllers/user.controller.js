import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    const userExists = User.findOne({
        $or: [{ username }, { email }],
    });

    if (userExists) throw new ApiError(409, "User already exists");

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (avatarLocalPath) throw new ApiError(400, "Avatar is required");

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) throw new ApiError(400, "Avatar is required");

    const user = await User.create({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        dob,
        gender,
        avatar: avatar.url,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    if (!createdUser)
        throw new ApiError(500, "Something went wrong while registering user");

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
});


export { registerUser };
