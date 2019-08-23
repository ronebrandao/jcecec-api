require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

const users = require("./routes/users");
const institutions = require("./routes/institutions");
const submissions = require("./routes/submissions");
const proofreads = require("./routes/proofreads");

app.use("/users", users);
app.use("/institutions", institutions);
app.use("/submissions", submissions);
app.use("/proofreads", proofreads);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("JCECEC - API. Porta 9000"));
