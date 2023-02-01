const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      throw new Error("product not found.");
    }

    req.user.favourites.push(product._id);
    await req.user.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Product liked successfully",
      result: {
        favourites: req.user.favorites,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to like the product by this id.",
      error.message
    );
  }
};
