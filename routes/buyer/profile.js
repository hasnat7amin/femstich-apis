const express = require("express");
const authorize = require("../../middlewares/authorize");
const { ChangeImage, ChangeDetails, ChangePassword, ContactUs } = require("../../controllers/buyer");
const multer = require("../../utils/multer");
const router = express.Router();

router.post("/image", authorize, multer.single("image"), authorize, ChangeImage );
router.put("/change-details", authorize, ChangeDetails);
router.put("/change-password", authorize, ChangePassword)
router.post("/contact-us",authorize,ContactUs)
module.exports = router;