const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { ErrorHandler } = require("../../utils/errorHandler");

const signup = async ({ name, username, email, password }) => {
  // check if user exist
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) throw new ErrorHandler(404, "User exists");

  const newUser = new User({
    name,
    username,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const newPost = new Post({
    question: {
      questionTxt:
        "This is your first question! you can choose to reply or to ignore...",
    },
    questionTo: newUser,
  });

  const post = await newPost.save();
  newUser.posts.push(post);

  const userCreated = await newUser.save();

  const token = jwt.sign(
    {
      id: userCreated.id,
    },
    process.env.JWT,
    { expiresIn: 3600 }
  );

  return token;
};

module.exports = signup;
