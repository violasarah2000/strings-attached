'use strict';

var Booking = require('../models/BookingModel.js');
var Transaction = require('../models/TransactionModel.js');
var paypal = require('paypal-rest-sdk');
require('../config/paypal.js');

exports.approval_url = '';
var booking_id = 0;
var stringsattachedUrl = '//localhost:4200';
var httpUrl = "http://localhost:3000"
if (process.env.NODE_ENV === 'production') {
  stringsattachedUrl = '//stringsattachedtx.com';
  httpUrl = "//localhost:3000"
}
exports.getAllBookings = function(req, res, next) {
  Booking.getAllBookings (function(err, bookings) {
    if (err) {
      res.send(err);
      return false
    }
    res.send(bookings);
  });
};

exports.getBookingById = function(req, res, next) {
  Booking.getBookingById(req.params.bookingId, function(err, booking) {
    if (err) {
      res.send(err);
      return false
    }
    res.json(booking);
  });
};

exports.createBooking = function(req, res, next) {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!req.body.fullname) {
    res.send({status: 400, message: 'Your name is required'});
    return false
  }
  if (!req.body.email_address) {
    res.send({status: 400, message: 'Email address is required'});
    return false
  }
  if (!emailRegexp.test(req.body.email_address)) {
    res.send({status: 400, message: 'Email address is not valid'});
    return false
  }
  if (!req.body.phone_number) {
    res.send({status: 400, message: 'Phone number is required'});
    return false
  }
  if (!req.body.event_type) {
    res.send({status: 400, message: 'Event Type is required'});
    return false
  }
  if (!req.body.event_date) {
    res.send({status: 400, message: 'Event Date is required'});
    return false
  }
  if (!req.body.start_time) {
    res.send({status: 400, message: 'Start time is required'});
    return false
  }
  if (!req.body.duration) {
    res.send({status: 400, message: 'Duration is required'});
    return false
  }
  if (!req.body.details) {
    res.send({status: 400, message: 'Details is required'});
    return false
  }
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": httpUrl + "/success",
        "cancel_url": httpUrl + "/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "booking",
                "sku": "booking",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Payment for strings attached service."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      Booking.createBooking(req.body, function(err, booking) {
        if (err) {
          res.send({status: 400, message: 'Bookings not added'});
          return false
        } else {
          var transaction_data = {
            id: payment.id,
            amount: payment.transactions[0].amount.total,
            booking_id: booking,
            currency: payment.transactions[0].amount.currency,
            transaction_date: payment.create_time,
            status: 'pending'
          };
          Transaction.createTransaction(transaction_data, function(err, transaction) {
            if (err) {
              res.send({status: 400, message: 'Transaction not added'});
              return false
            }
          });
          return res.send({status: 200, message: 'Bookings Successfully Added', data: payment});
        }
      });
    }
  });
}

exports.successPayment = function (req, res, next) {
  const paymentId = req.query.paymentId;
  const payer_id = req.query.PayerID;
  var execute_payment_json = {
    "payer_id": payer_id,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    }
    if (res) {
      var transaction_data = {
        id: payment.id,
        amount: payment.transactions[0].amount.total,
        currency: payment.transactions[0].amount.currency,
        transaction_date: payment.create_time,
        status: payment.state,
        recepient_name: payment.payer.payer_info.shipping_address.recipient_name,
        address: payment.payer.payer_info.shipping_address.line1,
        city: payment.payer.payer_info.shipping_address.city,
        state: payment.payer.payer_info.shipping_address.state,
        postal_code: payment.payer.payer_info.shipping_address.postal_code,
        country_code: payment.payer.payer_info.shipping_address.country_code
      }
      Transaction.updateTransaction(payment.id, transaction_data, function(err, transaction) {
        if (err) {
          res.send({status: 400, message: 'Transaction not updated'});
          return false
        }
        // res.json({status: 200, message: 'Bookings Successfully Added', data: { id: booking, url: exports.createPayment(req, res, next)}});
      });
      res.redirect(301, stringsattachedUrl + '/bookings?status='+payment.state)
      res.end()
    }
  });
}

exports.cancelPayment = function (req, res, next) {
  return res.send('Transaction Cancelled');
}
