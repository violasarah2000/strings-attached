import { BrowserModule, Title }                from '@angular/platform-browser';
import { NgModule }                            from '@angular/core';
import { FormsModule }                         from '@angular/forms';
import { HttpClientModule }                    from '@angular/common/http';

//Components
import { AppComponent }                        from './app.component';
import { AboutComponent }                       from './about/about.component';

//Routing
import { AppRoutingModule }                    from './app-routing.module';

//Boostrap
import {
         AlertModule,
         CarouselModule,
         AccordionModule,
         BsDatepickerModule,
         TimepickerModule
       } from 'ngx-bootstrap';
import { BookingsComponent } from './bookings/bookings.component';
import { ContactComponent } from './contact/contact.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { FaqComponent } from './faq/faq.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BookingsComponent,
    ContactComponent,
    RepertoireComponent,
    FaqComponent,
    SinglePageComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
