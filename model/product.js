var db = require('../db');

exports.get = function(callback)
{
    db.get().collection('products').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('products').findOne( {productId:id}, function(err, res) { callback(err, res)});
};

exports.create = function (task, callback)
{
    db.get().collection('products').insert(task, function(err, res) {callback(err, res)});
};

exports.delete = function (id, callback)
{
    db.get().collection('products').deleteOne({_id:id}, function(err, res) {callback(err, res)});
};
