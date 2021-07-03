const services = require("../../services/auth");
const { ErrorHandler } = require("../../utils/errorHandler");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ErrorHandler(404, "Missing required email and password fields");
    } else {
      const userData = await services.login({ username, password });
      res.json(userData)
    ;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = login;
