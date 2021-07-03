const express = require("express");
const User = require("../../models/User");

const services = require(".");
const { ErrorHandler } = require("../../utils/errorHandler");

const askQuestion = async (question, username) => {
  if (!question.replace(/\s/g, "").length) {
    return res.status(400).json({ msg: "Question only contains whitespace " });
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ErrorHandler(404, "Error in getting user");
  } else {
    const newPost = new Post({
      question: {
        questionTxt: question,
      },
      questionTo: user,
    });

    const post = await newPost.save();

    if (!post) {
      throw new ErrorHandler(404, "Error in getting post");
    } else {
      await user.posts.push(post);
      await user.save();
      return post;
    }
  }
};

module.exports = askQuestion;
