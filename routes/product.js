var express = require('express');
var router = express.Router();
var ProductDetails = require('../model/product-details'),
    ObjectId = require('mongodb').ObjectId;

router.get('/:productId', function (req, res, next) {
  var productId = req.params.productId;
  ProductDetails.findById(productId, function(error, result) {
      if (error) {
          var err = new Error();
          err.status = 500;
          err.message = "Failed to get product from database!";
          next(err);
          return;
      }
      res.render("product", { product: result });
  });
});


module.exports = router;

// var productId = req.params.productId;
// Products.findById(productId, function(error, result) {
//   if (error) {
//     var err = new Error("Cant find product with such name!");
//     err.statusCode = 404;
//     next(err);
//     return;
//   }
// });
// console.log('test');
// res.render('index');

//, { product: result });