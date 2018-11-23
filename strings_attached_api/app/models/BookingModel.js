'user strict';
var sql = require('./db.js');

//Task object constructor
var Booking = function(booking){
    this.fullname = booking.fullname;
    this.phone_number = booking.phone_number;
    this.email_address = booking.email_address;
    this.event_type = booking.event_type;
    this.event_date = booking.event_date;
    this.start_time = booking.start_time;
    this.duration = booking.duration;
    this.details = booking.details;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Booking.createBooking = function createBooking (newBooking, result) {
        sql.query("INSERT INTO bookings set ?", newBooking, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
Booking.getBookingById = function getBookingById (bookingId, result) {
        sql.query("Select * from bookings where id = ? ", bookingId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};

Booking.getAllBookings = function getAllBookings (result) {
        sql.query("Select * from bookings", function (err, res) {

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

module.exports= Booking;
