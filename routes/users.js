const express = require("express");
const router = express.Router();
const authenticationRoute = require("../helpers/authentication/index");

const controller = require("../controllers/users");

router.get("/", authenticationRoute, controller.list);
router.get("/:id/except", authenticationRoute, controller.listAllUsersExcept)
router.post("/", controller.create);
router.get("/:id", authenticationRoute, controller.get);
router.put("/:id", authenticationRoute, controller.update);
router.put("/submission/:id", authenticationRoute, controller.updateSubmissionIds);

module.exports = router;
