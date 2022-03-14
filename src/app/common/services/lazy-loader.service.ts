import { Injectable } from '@angular/core';
import { DynamicComponentDetails } from '../entities/constants';
@Injectable({
    providedIn: 'root',
})
export class LazyLoaderService {
    dynamicComponentDetails: DynamicComponentDetails[];
    constructor() {
        this.dynamicComponentDetails = [];
    }
   /**
    * It loads the modules lazily on demand
    */
    lazyLoadHotelModule() {
        return import('../../hotel');
    }
   /**
    * It removes the dynamic component.
    * @param componentName {{string}}
    */
    removeLazilyLoadedComponents(componentName: string): void {
        const index = this.dynamicComponentDetails.findIndex(dynamicComponent => {
            return dynamicComponent.name === componentName;
        });
        if (index !== -1) {
            this.dynamicComponentDetails[index].instance?.destroy();
            this.dynamicComponentDetails.splice(index, 1);
        }
    }
}