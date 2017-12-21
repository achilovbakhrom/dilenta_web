var express = require('express');
var router = express.Router();
let User = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    var allProducts = JSON.parse(req.cookies.cart_products);
    var isLoggedIn = req.cookies.username != null;
    var email = req.cookies.username;

    User.findByEmail(email, function (err, resp) {
        if (err){
            let err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        } else {
            var userdata = resp[0];
            res.render('shop-checkout-right', {products: allProducts, isLoggedIn: isLoggedIn, email: email, userdata: userdata});

        }

    });
    });

module.exports = router;
