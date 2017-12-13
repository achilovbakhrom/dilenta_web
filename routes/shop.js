var express = require('express');
var router = express.Router();

var
    Products = require('../model/product'),
    ObjectId = require('mongodb').ObjectId;


/* GET home page. */
router.get('/', function(req, res, next) {
    Products.get(function(error, result) {
        if (error) {
            var err = new Error();
            err.status = 500;
            err.message = "Failed to get products from database!";
            next(err);
            return;
        }
        res.statusCode = 200;
        res.render('shop-right', { products: result });
    });
});

module.exports = router;
