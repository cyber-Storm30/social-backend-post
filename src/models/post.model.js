import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
