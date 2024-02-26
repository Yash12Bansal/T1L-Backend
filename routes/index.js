const express = require("express");

const router = express.Router();

const indexController = require("../controller/index_controller");

router.use("/auth", require("./auth"));
router.use("/details", require("./details"));
router.use("/exercises", require("./exercises"));
router.use("/exerciseEntry", require("./exercise"));
router.use("/insulinEntry", require("./insulin"));
router.use("/bgEntry", require("./blood_glucose"));
router.use("/food", require("./food"));
router.use("/prediction", require("./prediction"));
// router.use('/expertAuth',require('./expert_auth'));
module.exports = router;
