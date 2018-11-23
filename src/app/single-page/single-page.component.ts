import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { AppComponent }        from '../app.component';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit {
  title: String = ''

  constructor( private route: ActivatedRoute, public app: AppComponent ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data.title
    this.app.setTitle(this.route.snapshot.data.title)
  }

}
