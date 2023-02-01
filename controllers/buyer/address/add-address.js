const Address = require("../../../models/Address");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const {
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
    } = req.body;

    const address = await Address.create({
      userId: req.user._id,
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
    });
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Address created successfully",
      result: {
        address: await Address.find({userId: req.user._id}),
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to add the address.", error.message);
  }
};
