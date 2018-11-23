module.exports = function(app) {
  var Booking = require('../controllers/BookingController');
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.route('/bookings')
    .get(Booking.getAllBookings)
    .post(Booking.createBooking);

  app.get('/success', Booking.successPayment);
  app.get('/cancel', Booking.cancelPayment);
};
