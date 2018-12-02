import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }      from '@angular/router';

import { AppComponent }        from '../app.component';
import { ApiService } from '../api/api.service';

import * as moment from 'moment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  title: String = '';
  booking: any = {
    fullname: '',
    phone_number: '',
    email_address: '',
    event_type: '',
    event_date: '',
    start_time: '',
    duration: '',
    details: ''
  };
  isAdded = false;
  isBooked = false;
  isSuccess = false;
  hasError = false;
  errorMessage = '';
  isLoadingResults = false;

  constructor(private route: ActivatedRoute, public app: AppComponent, private api: ApiService ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data.title;
    this.app.setTitle(this.route.snapshot.data.title);
    this.route.queryParams.subscribe(params => {
      if (params.status === 'approved') {
        this.isSuccess = true
      }
    })
  }

  setEventDate() {
    if (this.booking.event_date) {
      let event_date = moment(this.booking.event_date).format('YYYY-MM-DD');
      this.booking.event_date = event_date;
    }
  }

  setStartTime() {
    if (this.booking.start_time) {
      let start_time = new Date(this.booking.start_time);
      this.booking.start_time = start_time.getHours() + ':' + (start_time.getMinutes()<10?'0':'') + start_time.getMinutes();
    }
  }

  submitBooking() {
    this.isLoadingResults = true;
    this.api.addBooking(this.booking)
      .subscribe(res => {
        if (res.status === 200) {
          setTimeout(() => {
            this.isLoadingResults = false;
          }, 1000)
          window.location.href = res.data.links[1].href;
        } else {
          setTimeout(() => {
            this.hasError = true;
            this.isLoadingResults = false;
            this.errorMessage = res.message
            setTimeout(() => {
              this.hasError = false;
            }, 4000);
          }, 1000);
        }
    });
  }

  closeModal() {
    this.isSuccess = false;
  }

  clearForm() {
    this.booking = {
      fullname: '',
      phone_number: '',
      email_address: '',
      event_type: '',
      event_date: '',
      start_time: '',
      duration: '',
      details: ''
    }
    setTimeout(function () {
      this.hasError = false
      this.isAdded = false
    }, 5000)
  }

}
