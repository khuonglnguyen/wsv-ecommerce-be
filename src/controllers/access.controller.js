const accessService = require("../services/access.service");

class AccessController {
  signup = async (req, res, next) => {
    try {
      return res.status(200).json(accessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
