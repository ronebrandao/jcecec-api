const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/submissions");
const upload = multer();

router.get("/", controller.list);
router.post("/", upload.single("file"), controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);

module.exports = router;
