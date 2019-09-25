const express = require("express");
const router = express.Router();
const authenticationRoute = require("../helpers/authentication/index");

const controller = require("../controllers/proofreads");

router.get("/", authenticationRoute, controller.list);
router.post("/", authenticationRoute, controller.create);
router.get("/:id", authenticationRoute, controller.get);
router.put("/:id", authenticationRoute, controller.update);

module.exports = router;
