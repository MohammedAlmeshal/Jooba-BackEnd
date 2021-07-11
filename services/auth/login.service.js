const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { ErrorHandler } = require("../../utils/errorHandler");

const login = async ({ username, password }) => {
  // check if user exist by username or email
  const user = await User.findOne({
    $or: [{ email: username }, { username }],
  });
  if (!user)
    throw new ErrorHandler(
      404,
      "User with the specified email does not exists"
    );

  // validate pasword
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorHandler(404, "Incorrect credentials");
  } else {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT,
      { expiresIn: 3600 }
    );
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
};

module.exports = login;
