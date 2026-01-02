// validation/postValidation.js
import Joi from "joi";

export const createPostSchema = Joi.object({
  userName: Joi.string().min(2).max(25).trim().required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 25 characters",
  }),

  userPhone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(7)
    .max(20)
    .trim()
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Please enter a valid phone number",
    }),

  name: Joi.string().max(100).trim().required().messages({
    "string.empty": "Item name is required",
    "string.max": "Item name cannot exceed 100 characters",
  }),

  password: Joi.string().min(4).max(50).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters",
    "string.max": "Password cannot exceed 50 characters",
  }),

  // image: Joi.string().required(),

  description: Joi.string().max(500).trim().allow("").messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  city: Joi.string().trim().required().messages({
    "string.empty": "City is required",
  }),

  area: Joi.string().trim().required().messages({
    "string.empty": "Area is required",
  }),

  color: Joi.string().trim().allow(""),

  category: Joi.string()
    .valid(
      "هاتف",
      "مفاتيح",
      "محفظة",
      "حيوان أليف",
      "حقيبة",
      "وثائق",
      "مجوهرات",
      "أخرى"
    )
    .required()
    .messages({
      "any.only": "Please select a valid category",
    }),

  type: Joi.string().valid("موجود", "مفقود").required().messages({
    "string.empty": "Please specify if item is found or lost",
    "any.only": "Type must be either 'found' or 'lost'",
  }),

  status: Joi.string().valid("active", "resolved").default("active"),
});

export const updatePostSchema = Joi.object({
  password: Joi.string().min(4).max(50).required().messages({
    "string.empty": "Password is required to update post",
  }),

  userName: Joi.string().min(2).max(25).trim(),
  userPhone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(7)
    .max(20)
    .trim(),
  name: Joi.string().max(100).trim(),
  description: Joi.string().max(500).trim().allow(""),
  city: Joi.string().trim(),
  area: Joi.string().trim(),
  color: Joi.string().trim().allow(""),
  category: Joi.string().valid(
    "هاتف",
    "مفاتيح",
    "محفظة",
    "حيوان أليف",
    "حقيبة",
    "وثائق",
    "مجوهرات",
    "أخرى"
  ),
  type: Joi.string().valid("موجود", "مفقود"),
  status: Joi.string().valid("active", "resolved"),
}).min(2); // At least one field must be updated

export const deletePostSchema = Joi.object({
  password: Joi.string().min(4).max(50).required().messages({
    "string.empty": "Password is required to delete post",
  }),
});

export const verifyPasswordSchema = Joi.object({
  password: Joi.string().min(4).max(50).required().messages({
    "string.empty": "Password is required",
  }),
});
