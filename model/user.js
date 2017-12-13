var db = require('../db');

exports.get = function(callback)
{
    db.get().collection('users').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('users').findOne( {_id:id}, function(err, res) { callback(err, res)});
};

exports.create = function (task, callback)
{
    db.get().collection('users').insert(task, function(err, res) {callback(err, res)});
};

exports.delete = function (id, callback)
{
    db.get().collection('users').deleteOne({_id:id}, function(err, res) {callback(err, res)});
};

exports.findByEmail = function(email, callback)
{
    db.get().collection('users').find({email: email}).toArray(function (err, res) {
        callback(err, res)
    });
};