import { Feature, Map } from "ol";
import VectorSource from "ol/source/Vector";
import { HotelDetails } from '../../hotel/model/hotel-model';

/**
 * Input to create GeoJSON
 */
export interface GeoJSONFields {
    collectionName: string;
    propertiesName: string[];
    geographicCoordinatesFields: string[];
}
/**
 * GeoJSON data format
 */
export interface GeoJSONFormat {
    type: string;
    features: Feature[];
}
/**
 * Input passed to overlay container
 */
export interface OverLayOptions {
    map: Map;
    features?: Feature[];
    vectorSource?: VectorSource;
    selectedFeatureProps?: HotelDetails;
    evt? : any;
}