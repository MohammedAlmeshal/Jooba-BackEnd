const express = require("express");
const User = require("../../models/User");

const services = require("../../services/posts");
const { ErrorHandler } = require("../../utils/errorHandler");

const answerQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ErrorHandler(404, "Missing values");
    }
    const response = await services.ignoreQuestion(id);
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = answerQuestion;
