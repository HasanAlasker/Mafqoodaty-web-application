import express from "express";
import mongoose from "mongoose";

import PostModel from "../model/post.js";
import validate from "../middleware/joiValidation.js";
import { createPostSchema, updatePostSchema } from "../validation/post.js";

const router = express.Router();

// get posts with optional filter

router.get("/", async (req, res) => {
  try {
    const { type, city, area, status, category } = req.query;

    // Build filter object
    const filter = {};
    if (type) filter.type = type;
    if (city) filter.city = city;
    if (area) filter.area = area;
    if (status) filter.status = status;
    if (category) filter.category = category;

    const posts = await PostModel.find(filter).sort("-createdAt");

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// get post by id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await PostModel.findById(id);
    if (!post) return res.status(404).send("Post not found");

    return res.status(200).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// search for post

router.get("/search", async (req, res) => {
  try {
    const { q, type, city, area, category, status = "active" } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).send("Search query must be at least 2 characters");
    }

    // Build search filter
    const filter = {
      status,
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { color: { $regex: q, $options: "i" } },
      ],
    };

    // Add optional filters
    if (type) filter.type = type;
    if (city) filter.city = city;
    if (area) filter.area = area;
    if (category) filter.category = category;

    const posts = await PostModel.find(filter).sort("-createdAt").limit(50); // Limit results for performance

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// create post

router.post("/", validate(createPostSchema), async (req, res) => {
  try {
    const data = req.body;

    const newPost = new PostModel(data);
    if (!newPost) return res.status(400).send("Failed to create post");

    newPost.save();

    return res.status(201).send(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// edit post

router.put("/:id", validate(updatePostSchema), async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid post ID");
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    if (!updatedPost) return res.status(400).send("Failed to update post");

    return res.status(201).send(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// delete post

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid post ID");
    }

    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) return res.status(400).send("Failed to update post");

    return res.status(201).send(deletedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

export default router;
