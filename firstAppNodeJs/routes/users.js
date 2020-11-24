var express = require('express');
var router = express.Router();
 const User=require('../model/user');
 const bcrypt=require('bcrypt');
// /* GET users listing. */
router.post('/signup', (req, res, next)=>{


  User.find({username:req.body.username})
      .then(result=>{
        console.log(req.body)
        if(result.length<1)
        {
          bcrypt.hash(req.body.password,10,(error,hash)=>{
            if(error){
              res.status(404).json({
                massage:"error in hash"
              });
            }
            else {
              const usetInsert= new User({
                username: req.body.username ,
                password: hash
              })

              console.log(usetInsert);
              // res.send(req.body.username);
              usetInsert.save().then(result=>{
                res.status(200).json({
                  massage:'user yers',
                })
              }).catch(err=>{
                res.status(404).json({
                  massage:'error'
                })
              })

            }
          })
        }
        else
       {
             res.status(500).json({
               massage:"user inserted"
             })
       }
      })
      .catch(error=>{
          res.status(500).json({
            massage:"error"
          })
      });



});
router.get('/getusers',(req,res,next)=>{

  res.send(User.find({},'username',(error,result)=>{
      if(error){
        console.log(error);
        res.send("no");
      }
      console.log(result);
    }));
})
router.post('/signin',(req,res,next)=>{

  User.find({username:req.body.username})
      .then(user=>{
          if(user.length>=1)
          {
              bcrypt.compare(req.body.password, user[0].password).then(result=>{
                if(result)
                {
                  res.status(200).json({
                    massage:'sccess signin'
                  })
                }
                else
                {
                  res.status(404).json({
                    massage:'wrong password  '
                  })
                }
              }).catch(error=>{
                res.status(404).json({
                  massage:error
                })
              });
          }
          else{
            res.status(404).json({
              massage:'wrong user name '
            })
          }
      })
      .catch(error=>{
        res.status(500).json({
          meassage:error
        })
      });
})
router.patch('/updatuser/:id',(req,res,next)=>{

  bcrypt.hash(req.body.password,10)
      .then(hash=>{
        const newuser =({
          username:req.body.username,
          password:hash
        })
        User.findOneAndUpdate({_id:req.params.id},{$set:newuser})
            .then(result=>{
              if(result)
              {
                res.status(200).json({
                  massage:'user Update sccess'
                })
              }
              else
              {
                res.status(404).json({
                  massage:'user not found'
                })
              }
            })
            .catch(error=>{
              res.status(404).json({
                massage:error
              })
            });
      })
      .catch(error=>{
        res.status(500).json({
          massage:error
        })
      });



})
router.delete('/deleteuser/:id',(req,res,next)=>{
  User.findByIdAndDelete({_id:req.params.id})
      .then(result=>{
        if(result)
        {
          res.status(200).json({
            massage:'user deleted sccess'
          })
        }
        else
        {
          res.status(404).json({
            massage:'user not found'
          })
        }

      })
      .catch(error=>{
        res.status(404).json({
          massage:error
        })
      });

})
module.exports = router;
