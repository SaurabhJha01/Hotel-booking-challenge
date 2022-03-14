import { HttpHeaders } from '@angular/common/http';

/* Contract for request object to make http request */
export interface ApiOptionInterface {
    url: string; /* Url for the service */
    method: string; /* Http method */
    header?: 	string | { [name: string]: string | string[]}; /* Request header */ 
    responseType?: string; /* Type of Response */
    data?: any;
  }
 /**
  * Network url controller actions
  */
  export const CONTROLLER_API = {
    PATH_SEPARATOR: '/',
    GET_HOTEL_DETAILS: 'hotels'
  };