const express = require('express');
const router = express.Router()
const auth  = require("./auth");
const address = require("./buyer/address");
const product = require("./buyer/product");
const store = require("./buyer/store");
const profile = require("./buyer/profile");

router.use("/auth",auth);
router.use("/buyer/address",address);
router.use("/buyer/product", product);
router.use("/buyer/store",store);
router.use("/buyer/profile",profile);


module.exports = router