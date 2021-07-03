const express = require("express");
const User = require("../../models/User");

const services = require("../../services/posts");
const { ErrorHandler } = require("../../utils/errorHandler");

const askQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { username } = req.params;

    if (!question || !username) {
      throw new ErrorHandler(404, "Missing values");
    }
    const post = await services.askQuestion(question, username);
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = askQuestion;
