var db = require('../db');

exports.get = function(callback)
{
    db.get().collection('product_details').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('product_details').findOne( {productId:id}, function(err, res) { callback(err, res)});
};

exports.create = function (task, callback)
{
    db.get().collection('product_details').insert(task, function(err, res) {callback(err, res)});
};

exports.delete = function (id, callback)
{
    db.get().collection('product_details').deleteOne({_id:id}, function(err, res) {callback(err, res)});
};
