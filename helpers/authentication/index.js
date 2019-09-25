const express = require("express");
const CognitoExpress = require("cognito-express");

authenticationRoute = express.Router();

const cognitoExpress = new CognitoExpress({
  region: "us-east-2",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600000
});

authenticationRoute.use(function(req, res, next) {
  let accessTokenFromClient = req.headers.authorization;

  if (!accessTokenFromClient)
    return res.status(401).send("Access Token missing from header");

  cognitoExpress.validate(accessTokenFromClient, function(err, response) {
    if (err) return res.status(401).send(err);

    res.locals.user = response;
    next();
  });
});

module.exports = authenticationRoute;
