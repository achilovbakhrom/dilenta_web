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
            var total = 0.0;
            let productsForFrontEnd = [];
            for (var i = 0; i < result.length; i++) {

                for (var j = 0; j < products.length; j++) {
                    if (result[i].productId === products[j].id) {
                        total = total + parseFloat(result[i].price_amount) * parseFloat(products[j].value);

                        let tempTotal = parseFloat(products[j].value) * parseFloat(result[j].price_amount);
                        let product = new ProductToCookie(result[i].productId, result[i].image, result[i].name, result[i].price_amount, products[j].value, tempTotal)
                        productsForFrontEnd.push(product);
                    }
                }
            }
            res.cookie('cart_products', JSON.stringify(productsForFrontEnd));
            res.render('cart', {products: productsForFrontEnd, total: total});
        });
    }
});

let ProductToCookie = class ProductToCookie {
    constructor(id, image, name, price, qty, total) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.total = total;
    }
};


module.exports = router;