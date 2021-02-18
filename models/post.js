const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  question: {
    questionTxt: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }, 
  },

  answer: {
    answerTxt: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
