// blog.middleware.js

import Joi from "joi";
import CustomError from "../Utils/customError.js";

// Joi schema for blog data validation
const blogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

// Middleware function for validating blog data
export const validateBlogData = (req, res, next) => {
  const { error } = blogSchema.validate(req.body);
  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    return next(new CustomError("Validation failed", 400, validationErrors));
  }
  next();
};
