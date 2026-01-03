import express from "express";
import mongoose from "mongoose";
import _ from "lodash";

import PostModel from "../model/post.js";
import validate from "../middleware/joiValidation.js";
import {
  createPostSchema,
  updatePostSchema,
  verifyPasswordSchema,
} from "../validation/post.js";
import {
  deleteImageFromCloudinary,
  upload,
  uploadToCloudinary,
} from "../config/cloudinary.js";

const router = express.Router();

router.get("/wakeup", async (req, res) => {
  try {
    res.status(200).send("awake");
  } catch (err) {
    console.log(err);
  }
});

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

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// search for post
router.get("/search", async (req, res) => {
  try {
    const { q, type, city, area, category, status = "active" } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
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

    const posts = await PostModel.find(filter).sort("-createdAt").limit(50);

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get lost
router.get("/lost", async (req, res) => {
  try {
    const posts = await PostModel.find({ type: "مفقود" }).sort("-createdAt");

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get found
router.get("/found", async (req, res) => {
  try {
    const posts = await PostModel.find({ type: "موجود" }).sort("-createdAt");

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// verify password
router.post("/verify/:id", validate(verifyPasswordSchema), async (req, res) => {
  try {
    const password = req.body.password;
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await PostModel.findById(id).select("+password");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const doesPassMatch = await post.comparePassword(password);
    if (!doesPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password verified",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// create post
router.post(
  "/",
  upload.single("image"),
  validate(createPostSchema),
  async (req, res) => {
    let uploadedImage = null;

    try {
      const data = req.body;

      const postData = {
        ...data,
      };

      if (req.file) {
        uploadedImage = await uploadToCloudinary(req.file.buffer);
        postData.image = uploadedImage.secure_url;
        postData.imagePublicId = uploadedImage.public_id;
      }

      const newPost = new PostModel(postData);
      newPost.password = await newPost.hashPassword(data.password);

      await newPost.save();

      const response = _.omit(newPost.toObject(), [
        "password",
        "imagePublicId",
      ]);

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: response,
      });
    } catch (err) {
      // If post creation fails and image was uploaded, delete it from Cloudinary
      if (uploadedImage && uploadedImage.public_id) {
        await deleteImageFromCloudinary(uploadedImage.public_id);
      }

      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// edit post
router.put("/:id", validate(updatePostSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    // Find post with password to verify
    const post = await PostModel.findById(id).select("+password");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Verify password
    const doesPassMatch = await post.comparePassword(password);
    if (!doesPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, {
      runValidators: true,
      new: true,
    });

    const response = _.omit(updatedPost.toObject(), [
      "password",
      "imagePublicId",
    ]);

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// delete post
router.delete("/:id", validate(verifyPasswordSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    // Find post with password to verify
    const post = await PostModel.findById(id).select("+password");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Verify password
    const doesPassMatch = await post.comparePassword(password);
    if (!doesPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (post.imagePublicId) {
      await deleteImageFromCloudinary(post.imagePublicId);
    }

    // Delete post
    const deletedPost = await PostModel.findByIdAndDelete(id);

    const response = _.omit(deletedPost.toObject(), [
      "password",
      "imagePublicId",
    ]);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
