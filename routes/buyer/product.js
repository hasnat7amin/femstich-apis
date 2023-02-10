const express = require("express");
const authorize = require("../../middlewares/authorize");
const {
  GetProductHomeDetails,
  GetProductById,
  LikeProduct,
  DislikeProduct,
} = require("../../controllers/buyer");
const router = express.Router();

router.get("/home-details", authorize, GetProductHomeDetails);
router.get("/:id", authorize, GetProductById);
router.put("/:id/like", authorize, LikeProduct);
router.put("/:id/dislike", authorize, DislikeProduct);
// router.get("/:title", authorize, )
module.exports = router;
