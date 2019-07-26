const express = require("express")
const router = express.Router()

const institutions = require("../controllers/institutions")

router.get('/', institutions.list)
router.get('/:id', institutions.get)


module.exports = router