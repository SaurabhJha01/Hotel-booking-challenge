import { Injectable } from '@angular/core';
import { CONTROLLER_API } from '../entities/xhr-request';

@Injectable({
    providedIn: 'root'
})
/**
 * This servcie provides URL API for controller actions.
 */
export class ControllerAPIService {
    constructor() { }
    /**
     * Provide Controller Url to retrieve hotels details.
     */
    getHotelsUrl(): string {
        return this.getControllerAPIUrl(CONTROLLER_API.GET_HOTEL_DETAILS);
    }

    /**
     * Provide Controller Url for specified action.
     * @param action  specific action URI
   */
    getControllerAPIUrl(action: string, param?: {}): string {
        let URL = this.getControllerUrl() + CONTROLLER_API.PATH_SEPARATOR + action;
        return URL;
    }
    /**
     * @internal
     * Returns base controller url.
    */
    private getControllerUrl(): string {
        return 'http://localhost:3001';
    }
}

