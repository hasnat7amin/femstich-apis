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
}