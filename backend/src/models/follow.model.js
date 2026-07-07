import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId, //one who is following
            ref: "User",
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //one who the user follows
        },
    },
    {
        timestamps: true,
    },
);

const Follow = mongoose.model("Follow", followSchema);
export { Follow };
