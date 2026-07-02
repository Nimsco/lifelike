import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "A post must have an author"],
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        contentText: {
            type: String,
            trim: true,
        },
        contentImage: {
            type: String, //cloudinary image
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isPublished:{
            type:Boolean,
            default : true
        }
    },
    {
        timestamps: true,
    },
);
const Post = mongoose.model("Post",postSchema)

export default Post