import PostService from "../services/post.service.js";

class PostController {
  async createPost(req, res) {
    try {
      const post = await PostService.createPost(req.body);
      return res.status(200).json({
        success: true,
        data: post,
        message: "Create post succesfull",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      await PostService.updatePost(id, req.body);
      res.status(200).json({
        success: true,
        message: "Post updated succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      await PostService.deletePost(id);
      res.status(200).json({
        success: true,
        message: "Post deleted succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json({
        success: true,
        data: posts,
        message: "Posts fetched succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getPostbyId(req, res) {
    const { postId } = req.query;
    try {
      const posts = await PostService.getPostbyId(postId);
      res.status(200).json({
        success: true,
        data: posts,
        message: "Post fetched succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getUserPosts(req, res) {
    try {
      const posts = await PostService.getUserPost(req.params.id);
      res.status(200).json({
        success: true,
        data: posts,
        message: "Posts fetched succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async addCommentIdInCommentArray(req, res) {
    try {
      const { commentId, postId } = req.body;
      await PostService.addCommentIdInCommentArray(commentId, postId);
      res.status(200).json({
        success: true,
        message: "Comment id added",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new PostController();
