var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/authorize', function (req, res, next) {
    console.log("authorize");
    var loginQuery = function (db, callback) {

    };
    var url = 'mongodb://localhost:27017/dilenta';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        loginQuery(db, function() {
            db.close();
        });
    });

});

module.exports = router;
