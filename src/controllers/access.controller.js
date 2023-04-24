const { CREATED } = require("../core/success.reponse");
const accessService = require("../services/access.service");

class AccessController {
  signup = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await accessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
