import express from "express";
import { Blog } from "../models/blogModel.js";

exports.createBlog = async (req, res) => {
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

exports.getBlog = async (req, res) => {};

exports.getAllBlogs = async (req, res) => {};
exports.deleteBlog = async (req, res) => {};

exports.updateBlog = async (req, res) => {};
