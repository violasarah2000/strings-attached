import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { SinglePageComponent }  from './single-page/single-page.component'
import { BookingsComponent }    from './bookings/bookings.component'

//routes
const routes: Routes = [
  {
    path: '',
    component: SinglePageComponent,
    data: {
      title: 'Welcome'
    }
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    data: {
      title: 'Bookings'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
