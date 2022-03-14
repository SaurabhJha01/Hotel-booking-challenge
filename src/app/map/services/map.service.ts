import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import BaseLayer from 'ol/layer/Base'
import { FitOptions } from 'ol/View';
import { Extent } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import { Style } from 'ol/style';
import { OlFactoryService } from '../../common/services/ol-factory.service';
import { Options as IconOptions } from 'ol/style/Icon';
import { StringConstants } from '../../common/entities/constants';
import { GeoJSONFields, GeoJSONFormat } from '../../common/entities/map-config';
import VectorSource from 'ol/source/Vector';

/*****
 * MapService exposes the method of the openlayer to add/remove functionalities on the map
****************/
@Injectable({
    providedIn: 'root'
})
export class MapService {
    /**
     * Map object that will be used accross the application
     */
    public map: Map;
    constructor() {
    }
    /**
     * It sets the ol.Map instance and create the map.
    */
    public setMap(): void {
        this.map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });
    }
    /**
     * It returns the ol.Map instance
     */
    public getMap(): Map {
        return this.map;
    }
    /**
     * It adds layer to the map object.
     * @param layer {{VectorLayer}}
     */
    public addLayer(layer: VectorLayer): void {
        this.map?.getLayers().push(layer);
        this.fitToViewMap(layer);
    }

    /**
      * @internal
      * It adds a vector layer with the vector source provided to it;
      * @param geojsonObject 
      */
    public addVectorLayer(vectorSource: VectorSource): void {
        const vectorLayer = OlFactoryService.getVectorLayer({
            source: vectorSource,
            style: this.getHomeLocatorMarkerStyle()
        });
        this.addLayer(vectorLayer);
    }
    /**
     * It returns view of the map
     */
    public getView(): View {
        return this.map?.getView();
    }
    /**
     * It returns the locator marker style when feature is not selected
    */
    public getHomeLocatorMarkerStyle(): Style {
        const iconOptions: IconOptions = {
            src: StringConstants.IMAGES_URL.HOME_URL
        };
        return OlFactoryService.getStyle({
            image: OlFactoryService.getIconStyle(iconOptions)
        });
    }
    /**
     * It returns the locator marker style when feature is selected
     */
    public getActiveHomeLocatorMarkerStyle(): Style {
        const activeIconOptions: IconOptions = {
            src: StringConstants.IMAGES_URL.HOME_ACTIVE_URL
        };
        return OlFactoryService.getStyle({
            image: OlFactoryService.getIconStyle(activeIconOptions)
        });
    }

    /**
     * It transforms the json object passed to it to a GEOJSON format so that 
     * data can be plotted on the map
     * @param jsonInput {{ json can be of any type}}
     * @param geoJsonOptions {{GeoJSONFields}} 
     */
    public tranformJsonToGeoJson(jsonInput, geoJsonOptions: GeoJSONFields): GeoJSONFormat {
        const { collectionName, propertiesName, geographicCoordinatesFields } = geoJsonOptions;
        const geojsonObject = {
            type: 'FeatureCollection',
            features: []
        };
        for (let i = 0; i < jsonInput[collectionName].length; i++) {
            const jsonDetail = jsonInput[collectionName][i];
            const coordinates = [jsonDetail.position[geographicCoordinatesFields[0]], jsonDetail.position[geographicCoordinatesFields[1]]];
            const feature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                properties: {}
            };
            for (let prop of propertiesName) {
                feature.properties[prop] = jsonDetail[prop];
            }
            geojsonObject.features.push(feature);
        }
        return geojsonObject;
    }
    /**
     * It centres the map to the data plotted on the map
     * @param layer {{VectorLayer}}
     */
    private fitToViewMap(layer: VectorLayer): void {
        const fitOptions: FitOptions = { size: this.map.getSize() };
        const projExtent = this.map.getView().getProjection().getExtent();
        const dataExtent = layer.getSource().getExtent();
        const cleanExtent: Extent = [dataExtent[0], Math.max(dataExtent[1], projExtent[1]),
        dataExtent[2], Math.min(dataExtent[3], projExtent[3])];
        this.map.getView().fit(cleanExtent, fitOptions);
    }
}
