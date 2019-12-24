import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Strings Attached Texas LLC';
  public constructor( private titleService: Title ) { }

  public setTitle( newTitle: string) {
    let _s = this
    _s.titleService.setTitle(newTitle + ' | ' + this.title );
  }
}
