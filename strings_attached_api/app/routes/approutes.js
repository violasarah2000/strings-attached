module.exports = function(app) {
  var Booking = require('../controllers/BookingController');
  var User = require('../controllers/UserController');
  //Booking
  app.route('/bookings')
    .get(Booking.getAllBookings)
    .post(Booking.createBooking);

  // Payment
  app.get('/success', Booking.successPayment);
  app.get('/cancel', Booking.cancelPayment);

  //Auth
  app.post('/login', User.login);
  app.get('/logout', User.logout);
  app.post('/checkSession', User.checkSession);
};
