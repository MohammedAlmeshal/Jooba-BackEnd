const services = require("../../_services/auth");
const { ErrorHandler } = require("../../utils/errorHandler");

const getUser = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.id) {
      throw new ErrorHandler(404, "Missing values");
    }
    const userData = await services.getUser(user.id);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
