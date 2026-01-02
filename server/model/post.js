import mongoose from "mongoose";
import bcrypt from "bcrypt";

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: 2,
      maxlength: 25,
      required: true,
      trim: true,
    },
    userPhone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false, // Don't include in queries by default
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "هاتف",
        "مفاتيح",
        "محفظة",
        "حيوان أليف",
        "حقيبة",
        "وثائق",
        "مجوهرات",
        "أخرى",
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["موجود", "مفقود"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index for common queries
postSchema.index({ type: 1, city: 1, status: 1, createdAt: -1 });

postSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

postSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
