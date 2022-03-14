import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';
import { SharedModule } from '../common/shared.module';

@NgModule({
  declarations: [
    HotelBookingComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [HotelBookingComponent]
})
export class HotelModule { }
