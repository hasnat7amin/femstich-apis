const Address = require("../../../models/Address");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { id, name, phone, addressLine1, addressLine2, city, state, zipCode, country } = req.body;

    const address = await Address.findByIdAndUpdate(id, {
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country
      }, { new: true });
      if (!address) {
         throw new Error("Address not found.");
      }
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Address updated successfully",
      result: {
        address: await Address.find({userId: req.user._id}),
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to update the address.", error.message);
  }
};
