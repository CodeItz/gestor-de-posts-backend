import { Request, Response } from "express";
import Post from "../models/Post";
import PostSchedule from "./PostSchedule";

const PostController = {
  async index(req: Request, res: Response) {
    try {
      const posts = await Post.find();
      return res.json({ data: posts });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      return res.json({ data: post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async store(req: Request, res: Response) {
    try {
      const { consumerId } = req;

      req.body.clientId = consumerId;

      const post = await Post.create(req.body);
      PostSchedule.createSchedulePost(post);

      return res.json({ data: post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { consumerId } = req;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      if (post.clientId.toString() !== consumerId) {
        return res.status(401).json({
          message: "Operattion not permitted",
        });
      }

      const postUpdated = await post.updateOne(req.body, { new: true });

      return res.json({ data: postUpdated });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default PostController;
