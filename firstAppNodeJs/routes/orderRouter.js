const express=require('express');
const router=express.Router();
const Order=require('../model/Order');

router.post('/addorder',(req,res,next)=>{
    const orderToInsert=new Order({
        user:req.body.user,
        product:req.body.product
    });
    orderToInsert.save()
        .then(result=>{
            res.status(200).json({
                massage:'insert order success'
            })
        })
        .catch(err=>{
            res.status(404).json({
                massage:err
            })
        });
})
router.get('/',(req,res,next)=>{
    Order.find().populate('user','username')
        .then(result=>{
            res.status(200).json({
                data:result

            })
        })
        .catch(err=>{
            res.status(404).json({
                massage:err
            })
        });
})
//	"user": 5f4d1c99b9177c274e32bde8
router.patch('/update/:id',(req,res,next)=>{
    var newproduct=req.body.product;
    console.log(req.params.id)

    //5f4da5781d49f70aded785fa
    //5f4da5781d49f70aded785fa

    Order.find({_id : req.params.id})
        .then(olddata=>{
            var  oldproduct=olddata[0].product;
            //console.log('old data  ' +olddata[0].product)

            for(var indexoldproduct=0 ; indexoldproduct < oldproduct.length ; indexoldproduct=indexoldproduct+1)
            {     for(var indexnewproduct=0 ; indexnewproduct<newproduct.length ; indexnewproduct=indexnewproduct+1)
                {

                    if(newproduct[indexnewproduct]._id === oldproduct[indexoldproduct]._id)
                    {
                        oldproduct[indexoldproduct].quantity=parseInt(oldproduct[indexoldproduct].quantity)+parseInt(newproduct[indexnewproduct].quantity);
                        newproduct.splice(indexnewproduct,1);
                        // console.log('indexnew ='+indexnewproduct+
                        // 'old index='+indexoldproduct+'\n'
                        // )
                    }
                }
            }

            oldproduct=oldproduct.concat(newproduct);
            console.log(oldproduct);

            const neworder={
                product:oldproduct
            }
            //Product.findOneAndUpdate({_id:req.params.id},{$set :product})
            Order.findOneAndUpdate({_id:req.params.id},{$set :neworder})
                .then(result=>{
                    res.status(200).json({
                        massage:'order pudate success'
                    })
                })
                .catch(err=>{
                    res.status(404).json({
                        masaage:err
                    })
                });

        })
        .catch(err=>{
            res.status(404).json({
                massage:err
            })
        });
})
router.get('/:id',(req,res,next)=>{
    Order.findById(req.params.id)
        .then(result=>{
            res.status(200).json({
                massage:result
            })
        })
        .catch(err=>{
            res.status(404).json({
                massage:err
            })
        });
})
router.delete('/delete/:id',(req,res,next)=>{
    Order.findByIdAndDelete({_id:req.params.id})
        .then(result=>{
            res.status(200).json({
                massage:'order deleted success'
            })
        })
        .catch(err=>{
            res.status(404).json({
                massage:'order not found to delete'
            })
        });
})
module.exports=router;
