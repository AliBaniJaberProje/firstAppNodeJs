const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
// pic
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './productImage/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    }
})
const updlode = multer({
    storage: storage
})
//--//

router.get('/', (req, res, next) => {
    //get all product from DB
    Product.find({})
        .select(' _id name price')
        .then(result => {
            const allproducts = {
                data: result.map(result => {
                    return {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        url: {
                            type: 'GET',
                            urls: 'http://localhost:3000/products/' + result._id
                        }
                    }
                })
            }

            res.status(200).json({
                masaage: allproducts
            })
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        });
});
router.post('/addProduct', updlode.single('myfile'), (req, res, next) => {

    const productToInsert = new Product({
        name: req.body.name,
        price: req.body.price
    })
    productToInsert.save()
        .then(result => {
            res.status(200).json({
                massage: 'add new product'
            })
        })
        .catch(err => {
            res.status(404).text(err)
        });
})
router.get('/:id', (req, res, next) => {
    Product.find({ _id: req.params.id })
        .select(' _id name price')
        .then(result => {


            res.status(200).json({
                massage: result
            })
        })
        .catch(error => {
            res.status(404).json({
                massage: error
            })
        });
})

router.patch('/update/:id', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: product })
        .then(result => {
            res.status(200).json({
                masaage: 'product update success '
            })
        })
        .catch(err => {
            res.status(404).json({
                massage: 'product with this id ' + req.params.id + 'not found'
            })
        });
})
router.delete('/delete/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(result => {
        res.status(200).json({
            masssge: 'product delete success'
        })
    }).catch(err => {
        res.status(404).json({
            massage: 'product not found in db '
        })
    });
})

module.exports = router;
