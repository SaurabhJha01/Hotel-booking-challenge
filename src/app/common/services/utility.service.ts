import { Injectable } from '@angular/core';
import { StringConstants } from '../entities/constants';
@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    isMobile: boolean;
    /**
     * It compares the two dates passed to it and returns true if first date is before the second date
     * else returns false
     * @param firstDate {{string}} 
     * @param secondDate {{string}} 
     */
    public compareDates(firstDate: string, secondDate: string): boolean {
        if (new Date(firstDate) < new Date(secondDate)) {
            return true;
        } else {
            return false;
        }
    }
    /**     
     *  It checks the device type whether it is mobile or desktop
     */
    public getDeviceType(): boolean {
        this.isMobile = window.navigator.userAgent.toLowerCase().indexOf("mobile") > -1;
        if (this.isMobile) {
            if (screen.width > StringConstants.SCREEN_VIEWPORT_SIZE && screen.height > StringConstants.SCREEN_VIEWPORT_SIZE) {
                this.isMobile = false;
            } else {
                this.isMobile = true;
            }
        }
        return this.isMobile
    }
}
