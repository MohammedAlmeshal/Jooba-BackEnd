const User = require("../../models/User");
const { ErrorHandler } = require("../../utils/errorHandler");
const getUser = async (id) => {
  try {
    const user = await User.findById(id).select("-password -posts");
    if (!user) {
      throw new ErrorHandler(404, "No such user found");
    } else {
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = getUser;
