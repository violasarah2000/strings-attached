'user strict';
var sql = require('./db.js');

//Task object constructor
var Transaction = function(transaction){
    this.id = transaction.id;
    this.booking_id = transaction.booking_id;
    this.amount = transaction.amount;
    this.currency = transaction.currency;
    this.transaction_date = transaction.transaction_date;
    this.status = transaction.status;
    this.recepient_name = transaction.recepient_name;
    this.address = transaction.address;
    this.city = transaction.city;
    this.state = transaction.state;
    this.postal_code = transaction.postal_code;
    this.country_code = transaction.country_code;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Transaction.createTransaction = function createTransaction (newTransaction, result) {
        sql.query("INSERT INTO transactions set ?", newTransaction, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                }
            });
};

Transaction.updateTransaction = function updateTransaction (id, transaction, result) {
        sql.query("UPDATE transactions set ? WHERE id = ?",[transaction, id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
                }
            });
};

Transaction.getAllTransaction = function getAllTransaction (result) {
        sql.query("Select * from transactions Order by transaction_date desc", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);

                 result(null, res);
                }
            });
};

module.exports= Transaction;
