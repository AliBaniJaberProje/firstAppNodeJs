const mongoose=require('mongoose');

const userschems= mongoose.Schema({
     username : {
         type:String ,
         required : true,
         unique:true
     },
    password : {
         type : String ,
         required : true
    }
})
module.exports = mongoose.model('User',userschems);
