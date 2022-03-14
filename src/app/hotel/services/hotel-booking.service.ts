import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
/**
 * It works as worker for hhotel component
 */
export class HotelBookingService {
    constructor() { }
    /**
     * It removes the checkin and checkout date errors
     */
    public removeCheckinCheckOutDatesErrors(bookingForm: FormGroup): void {
        bookingForm.controls.checkinDate.setErrors(null);
        bookingForm.controls.checkoutDate.setErrors(null);
    }
}

