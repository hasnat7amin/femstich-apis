const Product = require("../../../models/Product");
const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      throw new Error("product not found.");
    }
    
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: product._id } }, { new: true });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Product disliked successfully",
      result: {
        favourites: user.favorites,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to dislike the product by this id.",
      error.message
    );
  }
};
