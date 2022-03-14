/**
 * The contract for the hotel details from the back end
 */
export interface HotelDetails {
    distance: number;
    title: string;
    address: Address;
    position: GeographicalPosition; 
}
/**
 * Address of the hotel
 */
export interface Address {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode: string;
    state: string;
    countyCode: string;
    county: string;
    city: string;
    district: string;
    street: string;
    postalCode: string;
    houseNumber: string;
}
/**
 * Longitude and latitude cooridnates to plot the hotel location on map
 */
export interface GeographicalPosition {
    lat: number;
    lng: number;
}