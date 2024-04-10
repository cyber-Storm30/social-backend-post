import PostModel from "../models/post.model.js";
import axios from "axios";
import { BASE_URL } from "../config/connection.js";
import cloudinary from "../config/cloudinary.js";

class PostService {
  async createPost(payload) {
    try {
      const post = new PostModel(payload);
      const userResponse = await axios.get(
        `${BASE_URL}/auth/user/${payload.userId}`
      );
      const userDetails = userResponse.data.data;
      const savedUser = await post.save();
      const postWithUserDetails = {
        ...savedUser.toObject(),
        userId: userDetails,
        // likes: likesDetails,
      };
      return postWithUserDetails;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async imageUpload(payload) {
    try {
      cloudinary.uploader.upload(payload, function (err, result) {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updatePost(id, payload) {
    try {
      const post = await PostModel.findById(id);
      if (!post) {
        throw new Error("Post not available");
      }
      await post.updateOne(payload);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletePost(id) {
    try {
      const post = await PostModel.findById(id);
      if (!post) {
        throw new Error("Post not available");
      }
      await PostModel.findOneAndDelete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllPosts() {
    try {
      const posts = await PostModel.find().sort({ createdAt: -1 });
      if (!posts || posts.length === 0) {
        throw new Error("No posts available");
      }
      // populating the user details
      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          try {
            const userResponse = await axios.get(
              `${BASE_URL}/auth/user/${post.userId}`
            );
            const userDetails = userResponse.data.data;
            const postWithUserDetails = {
              ...post.toObject(),
              userId: userDetails,
              // likes: likesDetails,
            };
            return postWithUserDetails;
          } catch (userError) {
            console.log(userError);
            return post;
          }
        })
      );
      return postsWithUserDetails;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async getPostbyId(postId, toPopulate) {
    try {
      let post = await PostModel.findById(postId);
      if (!post) {
        throw new Error("Post not available");
      }
      if (toPopulate && toPopulate === "false") {
        return post;
      }
      const userResponse = await axios.get(
        `${BASE_URL}/auth/user/${post.userId}`,
        { withCredentials: true }
      );
      const userDetails = userResponse.data.data;
      const likesDetails = await Promise.all(
        post.likes.map(async (likeUserId) => {
          try {
            const likeUserResponse = await axios.get(
              `${BASE_URL}/auth/user/${likeUserId}`
            );
            return likeUserResponse.data.data;
          } catch (likeUserError) {
            console.error("Error fetching like user details:", likeUserError);
            return null;
          }
        })
      );
      post = {
        ...post.toObject(),
        userId: userDetails,
        likedUsers: likesDetails,
      };
      return post;
    } catch (err) {
      console.log("err in post service", err.message);
      throw new Error(err.message);
    }
  }

  async getUserPost(id) {
    try {
      const posts = await PostModel.find({ userId: id });
      const userDetails = await axios.get(`${BASE_URL}/auth/user/${id}`);
      const newPosts = {
        posts,
        user: userDetails.data.data,
      };
      if (!posts) {
        throw new Error("Post not available");
      }
      return newPosts;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addCommentIdInCommentArray(commentId, postId) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new Error("Post not available");
      }
      if (!post.comments.includes(commentId)) {
        await post.updateOne({ $push: { comments: commentId } });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new PostService();
