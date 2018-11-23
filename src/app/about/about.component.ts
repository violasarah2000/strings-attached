import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { AppComponent }        from '../app.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title: String = ''

  constructor( private route: ActivatedRoute, public app: AppComponent ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data.title
    this.app.setTitle(this.route.snapshot.data.title)
  }

}
