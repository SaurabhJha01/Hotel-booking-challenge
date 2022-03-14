
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { HotelBookingService } from '../../services/hotel-booking.service';
import { HotelDetails } from '../../model/hotel-model';
import { LazyLoaderService } from '../../../common/services/lazy-loader.service';
import { UtilityService } from '../../../common/services/utility.service';


@Component({
  selector: '',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent implements OnDestroy {
  bookingForm: FormGroup;
  emailValidation: boolean = true;
  @Input() inputDetails: HotelDetails;
  checkinDateSubscription: Subscription;
  checkoutDateSubscription: Subscription;;

  constructor(private fb: FormBuilder,
    private hotelBookingService: HotelBookingService,
    private lazyLoaderService: LazyLoaderService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
    const hotelDetails = this.inputDetails;
    // Form to display controls to enter booking details
    this.bookingForm = this.fb.group({
      hotelTitle: [{ value: hotelDetails.title, disabled: true }],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      checkinDate: [null, Validators.required],
      checkoutDate: [null, Validators.required]
    });
   /** Listeners for change in CheckinDate to validate that checkin date must be before checkout date
    *  else set error
    **/
    this.checkinDateSubscription = this.bookingForm.controls.checkinDate.valueChanges.subscribe(checkinDate => {
      const checkoutDate = this.bookingForm.controls.checkoutDate.value;
      if (checkoutDate) {
        const isCheckoutDataBeforeCheckIndate = this.utilityService.compareDates(this.bookingForm.controls.checkoutDate.value, checkinDate);
        if (isCheckoutDataBeforeCheckIndate) {
          this.bookingForm.controls.checkinDate.setErrors({ 'checkinNotValidError': true });
        } else {
          this.hotelBookingService.removeCheckinCheckOutDatesErrors(this.bookingForm);
        }
      }
    });
     /** Listeners for change in CheckoutDate to validate that checkout date must be after checkin date
     *  else set error
    **/
    this.checkoutDateSubscription = this.bookingForm.controls.checkoutDate.valueChanges.subscribe(checkoutDate => {
      const checkinDate = this.bookingForm.controls.checkinDate.value;
      if (checkinDate) {
        const isCheckoutDataBeforeCheckIndate = this.utilityService.compareDates(checkoutDate, this.bookingForm.controls.checkinDate.value);
        if (isCheckoutDataBeforeCheckIndate) {
          this.bookingForm.controls.checkoutDate.setErrors({ 'checkoutNotValidError': true });
        } else {
          this.hotelBookingService.removeCheckinCheckOutDatesErrors(this.bookingForm);
        }
      }
    });
  }
  /**
   * It submits the booking form and closes it
   */
  onSubmit(): void {
    alert(JSON.stringify(this.bookingForm.value));
    this.lazyLoaderService.removeLazilyLoadedComponents('HotelBookingComponent');
  }
  /**
   * It closes the booking form
   */
  onCancel(): void {
    this.lazyLoaderService.removeLazilyLoadedComponents('HotelBookingComponent');
  }

  ngOnDestroy() {
    this.checkinDateSubscription?.unsubscribe();
    this.checkinDateSubscription?.unsubscribe();
  }
}
