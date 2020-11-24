const mongoose=require('mongoose');

const order=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type: Array
    }
})
module.exports=mongoose.model('Order',order);
