import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
        },
        gender: {
            type: String,
            enum: ["male", "female", "other", "prefer-not-to-say"],
            required: [true, "Gender selection is required"],
        },
        profilePic: {
            type: String, // cloudinary url
            default:
                "https://res.cloudinary.com/your-cloud/image/upload/default-avatar.png",
        },
        blocked: { 
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

export default User;
