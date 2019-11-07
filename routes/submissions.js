const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticationRoute = require("../helpers/authentication/index");

const controller = require("../controllers/submissions");
const upload = multer();

router.get("/:id", controller.list);
router.post("/", authenticationRoute, upload.single("file"), controller.create);
router.get("/:id", authenticationRoute, controller.get);
router.get("/file/:id", authenticationRoute, controller.getFile);
router.put("/:id", authenticationRoute, controller.update);

module.exports = router;
