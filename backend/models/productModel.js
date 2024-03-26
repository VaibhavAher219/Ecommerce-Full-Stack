const mongoose = require("mongoose");
const User= require('./userModel')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'please enter product name'],
    },
    description:{
        type:String,
        required : [true,'please enter product desc'],
    },
    price:{
        type:Number,
        required : [true,'please enter product price'],
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    rating:{
        type : Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String
        },
        url:{
        type:String,
        required : [true,'please enter image url'],}   
        }
    ],
    category : {
        type:String,
        required :[true,"Enter Ctaegory"]
    },
    Stock:{
        type:Number,
        required:true,
        default:1
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews :[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user1:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model("Product",productSchema);