import express from "express";
import { Blog } from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, user, createdAt } = req.body;
    const blog = await Blog.create(req.body);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "The blog has been created",
      payload: { blog },
    });
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      success: false,
      message: "Some error while creating the Blog",
      payload: { error },
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(400).json({
        statusCode: 404,
        success: false,
        message: "Can't get the Blog",
        payload,
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Blog Retrieved",
      payload: { blog },
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 404,
      success: false,
      message: "Some error while retrieving the Blog",
      payload: { error },
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "All Blogs Retrieved",
      payload: { blogs },
    });
  } catch (error) {
    res.status(402).json({
      statusCode: 402,
      success: false,
      message: "Some error while retrieving All Blogs",
      payload: { error },
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 404,
      success: false,
      message: "Some error while Deleting the Blog",
      payload: { error },
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: "Blog can't be updated",
      payload: { error },
    });
  }
};
