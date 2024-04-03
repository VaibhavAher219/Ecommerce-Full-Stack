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



//create new  review

exports.createReview= catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review={
        user1:  req.User.id,
        name:req.user1.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=>rev.user1.toString()===req.user.id)
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev=>rev.user1.toString()===req.user1.id){
            rev.rating = rating,
            rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg=0;
    product.ratings= product.reviews.forEach(rev=>{
        avg=avg+rev.rating;

    })/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
})
