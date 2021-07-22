const services = require("../../_services/auth");
const { ErrorHandler } = require("../../utils/errorHandler");

const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      throw new ErrorHandler(404, "Missing required fields");
    } else {
      const token = await services.signup({ name, username, email, password });
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = signup;
