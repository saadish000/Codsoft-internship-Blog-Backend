import express from "express";
import { Blog } from "../models/blogModel.js";
import CustomError from "../Utils/customError.js";
import { catchAsyncError } from "../middleware/asyncErrorHandler.js";

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, description, user, createdAt } = req.body;
  const blog = await Blog.create(req.body);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "The blog has been created",
    payload: { blog },
  });
});

export const getBlog = catchAsyncError(async (req, res, next) => {
  const blogId = req.params.body;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new CustomError("Can't get the Blog", 400));
  }
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Blog Retrieved",
    payload: { blog },
  });
});

export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All Blogs Retrieved",
    payload: { blogs },
  });
});

export const deleteBlog = catchAsyncError(async (req, res) => {
  const blogId = req.params.id;
  await Blog.findByIdAndDelete(blogId);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Blog Deleted Successfully",
  });
});

export const updateBlog = catchAsyncError(async (req, res) => {
  const blogId = req.params.id;
  const { title, description, user } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { title, description, user },
    { new: true }
  );
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Blog has been updated Successfully",
    payload: { updatedBlog },
  });
});
