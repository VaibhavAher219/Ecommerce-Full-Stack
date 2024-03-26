const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');
const User = require('../models/userModel')
//Creating Product

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user1 = req.User.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

//getALLproducts
exports.getAllProducts =catchAsyncErrors(async(req,res)=>{
    const resultPerPage = 5 ;
    const productCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await apifeatures.query;
    res.status(201).json({
        success:true,
        products
    })
});

//update a product
exports.updateProduct = catchAsyncErrors(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })

});
//Get Product details
exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })

});


//deletion
exports.deleteProduct = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message : "Product deleted"
    })
} );