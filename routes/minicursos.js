const express = require("express");
const router = express.Router();
const authenticationRoute = require("../helpers/authentication/index");

const controller = require("../controllers/minicursos");

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post(
  "/subscribe/:id/:userId",
  authenticationRoute,
  controller.subscribe
);
router.post(
  "/unsubscribe/:id/:userId",
  authenticationRoute,
  controller.unsubscribe
);

module.exports = router;
