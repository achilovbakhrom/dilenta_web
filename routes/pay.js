var express = require('express');
var router = express.Router();
let User = require('../model/user');
let Product = require('../model/product-details')
/* GET home page. */
router.get('/:productId/:coin', function(req, res, next) {
    var email = req.cookies.username;
    var productId = req.params.productId;
    var coin = req.params.coin;
    User.findByEmail(email, function (err, resp) {
        if (err){
            let err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        } else {
            var userdata = resp[0];

            res.render('pay', {products: allProducts, isLoggedIn: isLoggedIn, email: email, userdata: userdata});
        }

    });
});

module.exports = router;
