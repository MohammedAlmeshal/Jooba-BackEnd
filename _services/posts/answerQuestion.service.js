const express = require("express");
const User = require("../../models/User");
const Post = require("../../models/Post");

const services = require(".");
const { ErrorHandler } = require("../../utils/errorHandler");

const answerQuestion = async (answer, id) => {
  const update = {
    answer: {
      answerTxt: answer,
    },
  };

  const post = await Post.findOneAndUpdate(
    { _id: id, answer: { $exists: false } },
    update,
    {
      new: true,
    }
  );

  if (!post) {
    throw new ErrorHandler(404, "Error in getting post");
  } else {
    return post;
  }
};
module.exports = answerQuestion;
