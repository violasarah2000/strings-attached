import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { AppComponent }        from '../app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title: String = ''

  constructor( private route: ActivatedRoute, public app: AppComponent ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data.title
    this.app.setTitle(this.route.snapshot.data.title)
  }

}
