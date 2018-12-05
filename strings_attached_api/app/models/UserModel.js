'user strict';
var sql = require('./db.js');
//User object constructor
var User = function(user){
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
    this.updated_at = new Date();
};

User.getUser = function getUser (email, result) {
  sql.query("Select * from users where email = ? ", [email], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

module.exports= User;
