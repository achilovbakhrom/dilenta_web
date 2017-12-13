var express = require('express');
var router = express.Router();

var
    Users = require('../model/user'),
    ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

router.post('/save', function (req, response, next) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var companyName = req.body.company_name;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;
    var password = req.body.password;

    Users.findByEmail(email, function(err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        }
        if (res.length === 0) {
            var guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            var sessionId = guid();
            Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                companyName: companyName,
                address: address,
                sessionId: sessionId,
                phone: phone
            }, function(err, res) {
                if (err) {
                    var err = new Error();
                    err.status = 500;
                    err.message = "failed to write to DB";
                    next(err);
                    return;
                }

                response.json({

                    message: "OK",
                    sessionId: sessionId
                });
                response.statusCode = 200;
                response.send();
            })
        } else {
            var err = new Error();
            err.status = 409;
            next(err);
        }

    });
});

module.exports = router;
