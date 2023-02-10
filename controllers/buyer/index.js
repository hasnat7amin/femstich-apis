module.exports= {

    // products 
    GetProductHomeDetails: require("./products/get-home-details"),
    GetProductById: require("./products/get-product-by-id"),
    LikeProduct: require("./products/like-product"),
    DislikeProduct: require("./products/dislike-product"),


    // store 
    GetStoreById: require("./store/get-store-by-id"),


    //address
    AddAddress: require("./address/add-address"),
    DeleteAddress: require("./address/delete-address"),
    GetAddress: require("./address/get-address"),
    UpdateAddress: require("./address/update-address"),

    // profile
    ChangeImage: require("./profile/change-image"),
    ChangeDetails: require("./profile/change-details"),
    ChangePassword: require("./profile/change-password"),
    ContactUs: require("./profile/contact-us"),
}