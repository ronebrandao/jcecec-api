require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CognitoExpress = require("cognito-express");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

const users = require("./routes/users");
const institutions = require("./routes/institutions");
const submissions = require("./routes/submissions");
const proofreads = require("./routes/proofreads");

authenticationRoute = express.Router();

app.use("/", authenticationRoute);

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

app.use("/users", users);
app.use("/institutions", institutions);
app.use("/submissions", submissions);
app.use("/proofreads", proofreads);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("JCECEC - API. Porta 9000"));
