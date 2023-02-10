const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    

    const user = await User.findOne({ _id: req.user._id}).select("favorites").populate({
      path: "favorites",
      select: "title description price images"
    })

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Favorites Product found successfully",
      result: {
        favourites: user.favorites,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to find the favorites products.",
      error.message
    );
  }
};
