var express = require('express');
var router = express.Router();
var ProductDetails = require('../model/product-details'),
    ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {
    if (req.cookies.cart === undefined) {
        res.redirect('../shop');
    } else {
        var products = JSON.parse(req.cookies.cart);

        var ids = [];
        for (let i = 0; i < products.length; i++) {
            ids.push(products[i].id);
        }
        ProductDetails.findByArrayId(ids, function (error, result) {
            if (error) {
                let err = new Error();
                err.status = 500;
                err.message = "Failed to get products from database!";
                next(err);
                return;
            }
            let productDetails = [];
            var total = 0.0;
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < products.length; j++) {
                    if (result[i].productId === products[j].id) {
                        var prodDetail = new ProductDetailsQty(result[i], products[j].value);
                        productDetails.push(prodDetail);
                        total = total + parseFloat(result[i].price_amount) * parseFloat(products[j].value);
                    }
                }
            }
            res.render('cart', {products: productDetails, total: total});
        });

    }
});

var ProductDetailsQty = class ProductDetailsQty {
    constructor(product, qty) {
        this.product = product;
        this.qty = qty;
    }
}

module.exports = router;