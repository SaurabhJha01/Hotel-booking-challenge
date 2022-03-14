import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { useGeographic } from 'ol/proj';
import { take } from 'rxjs/operators';
import { MapService } from '../../services/map.service';
import { XhrInvokeService } from '../../../common/services/xhr.invoke.service';
import { StringConstants } from '../../../common/entities/constants';
import { ControllerAPIService } from '../../../common/services/controller-api.service';
import { OlFactoryService } from '../../../common/services/ol-factory.service';
import { GeoJSONFields, GeoJSONFormat, OverLayOptions } from '../../../common/entities/map-config';
import { ApiOptionInterface } from '../../../common/entities/xhr-request';
import { Feature } from 'ol';
import { unByKey } from 'ol/Observable';
import { EventsKey } from 'ol/events';
import { HotelDetails } from '../../../hotel/model/hotel-model';
import { LazyLoaderService } from '../../../common/services/lazy-loader.service';

/**
 * This component renders the map and plots data points on to it.
 */
@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})
export class MapBuilderComponent implements OnInit, AfterViewInit {
  overlayData: OverLayOptions;
  vectorGeoJSON: GeoJSONFormat;
  highlightedFeature: Feature;
  isBookingAllowed: boolean;
  hotelDetails: HotelDetails;
  singleClickListener: EventsKey | EventsKey[]; // handler for map click
  constructor(private mapService: MapService,
    private xhrInvokeService: XhrInvokeService,
    private controllerAPIService: ControllerAPIService,
    private lazyLoaderService: LazyLoaderService) { }

  ngOnInit() {        
  // Calling the useGeographic function in the 'ol/proj' module makes it so the map view uses geographic coordinates (even if the view projection is not geographic).
    useGeographic();
    this.mapService.setMap();
    this.fetchHotelDetails();
    this.overlayData = {
      map: this.mapService.getMap(),
      features: []
    }
  }

  ngAfterViewInit() {
    // Handler to open the overlay and to highlight the data point
    this.singleClickListener = this.overlayData.map.on('singleclick', (evt) => {
      this.resetDefaultValueOnMapClick();
      setTimeout(() => {
        this.handleMapClick(evt);
      }, 0);
    });
  }
  /**
    * It higlights the data point on map either coming via click or from swipe
    * @param {{Feature}} 
  */
  public higlightFeatureonMap(feature: Feature): void {
    const higlightStyle = this.mapService.getActiveHomeLocatorMarkerStyle();
    const staticStyle = this.mapService.getHomeLocatorMarkerStyle();
    if (feature !== this.highlightedFeature) {
      if (this.highlightedFeature) {
        this.highlightedFeature.setStyle(staticStyle);
      }
      if (feature) {
        feature.setStyle(higlightStyle);
      }
      this.highlightedFeature = feature;
    }
  }
 /**
  * It triggers the directive to lazily load the hotel booking form
  * @param hotelDetails  {{ HotelDetails}}
  */
  public loadBookingForm(hotelDetails: HotelDetails): void {
    this.isBookingAllowed = true;
    this.hotelDetails = hotelDetails;
  }
  /**
   * @internal
   * It makes an ajax call to fetch the hotel details
   */
  private fetchHotelDetails(): void {
    const requestOptions: ApiOptionInterface = {
      url: this.controllerAPIService.getHotelsUrl(),
      method: StringConstants.HTTP_REQUEST.GET
    }
    this.xhrInvokeService.invokeControllerAPI(requestOptions).pipe(take(1)).subscribe((hotelDetails) => {
      const geoJsonOptions: GeoJSONFields = {
        collectionName: 'items',
        propertiesName: ['title', 'address', 'distance'],
        geographicCoordinatesFields: ['lng', 'lat']
      };
      this.vectorGeoJSON = this.mapService.tranformJsonToGeoJson(hotelDetails, geoJsonOptions);
      const vectorSource: VectorSource = OlFactoryService.getVectorSource({ features: new GeoJSON().readFeatures(this.vectorGeoJSON) });
      this.mapService.addVectorLayer(vectorSource);
      this.overlayData.vectorSource = vectorSource;
    });
  }

  /**
 * @internal
 * It highligts the data point on map on click
 * @param evt 
 */
  private handleMapClick(evt): void {
    const map = this.mapService.getMap();
    map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
      this.higlightFeatureonMap(feature);
      this.overlayData.features = this.vectorGeoJSON.features.filter((ftr: any) => ftr.properties.title !== feature.getProperties().title)
      this.overlayData.selectedFeatureProps = feature.getProperties();
      this.overlayData.evt = evt;
    });
  }
 /**
  * It resets the  default overlay data passed to overlay upon each click of map
  */
  private resetDefaultValueOnMapClick(): void {
    this.overlayData.selectedFeatureProps = null;
    this.overlayData.features = [];
    this.isBookingAllowed = false;   
  }

  ngOnDestroy(): void {
    if (this.singleClickListener) {
      unByKey(this.singleClickListener);
    }
  }
}