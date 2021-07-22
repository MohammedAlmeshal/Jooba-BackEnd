const express = require("express");
const User = require("../../models/User");

const services = require("../../_services/posts");
const { ErrorHandler } = require("../../utils/errorHandler");

const answerQuestion = async (req, res, next) => {
  try {
    const { answer } = req.body;
    const { id } = req.params;
    if (!id || !answer) {
      throw new ErrorHandler(404, "Missing values");
    }

    const post = await services.answerQuestion(answer, id);
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = answerQuestion;
