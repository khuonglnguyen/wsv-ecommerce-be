const { CREATED, SuccessResponse } = require("../core/success.reponse");
const AccessService = require("../services/access.service");
const accessService = require("../services/access.service");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  signup = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await accessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
