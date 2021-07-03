const express = require("express");
const User = require("../../models/User");

const services = require(".");
const { ErrorHandler } = require("../../utils/errorHandler");

const answerQuestion = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ErrorHandler(404, "Error in getting post");
  } else {
    const removedPost = await post.remove();
    if (!removedPost) {
      throw new ErrorHandler(404, "Error in removing post");
    } else {
      return { success: true, msg: "Post was removed successfully" };
    }
  }
};
module.exports = answerQuestion;
