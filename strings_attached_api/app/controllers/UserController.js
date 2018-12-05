'use strict';
var User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

exports.login = function (req, res, next) {
  var email= req.body.email;
  var password = req.body.password;
  User.getUser(email, function(err, user){
    if (err) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(user.length >0){
        if(user[0].password == password){
          const salt = bcrypt.genSaltSync();
          const token = bcrypt.hashSync(password, salt);
          res.cookie('_token', token, { maxAge: 900000, httpOnly: true });
          res.send({
            "code":200,
            "success":"login sucessfull",
            "data": { "_token": token }
              });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
  })
}

exports.logout = function (req, res, next){
  res.clearCookie('_token');
  res.send({"code": 200, "success": "Session Logged out"})
}

exports.checkSession = function (req, res, next){
  const _token = req.body._token;
  if (req.cookies['_token'] !== _token) {
    res.clearCookie('_token');
    res.send({"code": 204, "success": "Session already expired"})
  } else {
    res.send({"code": 200, "success": "Session Exists"})
  }
}
