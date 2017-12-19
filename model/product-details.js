var db = require('../db');

exports.get = async function(callback)
{
    await db.get().collection('product_details').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findById = async function (id, callback)
{
    await db.get().collection('product_details').findOne( {productId:id}, function(err, res) { callback(err, res)});
};

exports.create = async function (task, callback)
{
    await db.get().collection('product_details').insert(task, function(err, res) {callback(err, res)});
};

exports.delete = async function (id, callback)
{
    await db.get().collection('product_details').deleteOne({_id:id}, function(err, res) {callback(err, res)});
};


exports.findByArrayId = async function (array, callback)
{
    await db.get().collection('product_details').find({productId: {$in: array }}).toArray(function(err, res) {callback(err, res)});
};
