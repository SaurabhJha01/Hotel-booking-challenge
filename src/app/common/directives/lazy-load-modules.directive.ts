import {
    ComponentFactoryResolver, Directive, OnDestroy, OnInit, ViewContainerRef,
    Renderer2, Injector, ElementRef, Input, ComponentRef
} from '@angular/core';
import { LazyLoadedModules } from '../entities/constants';
import { LazyLoaderService } from '../services/lazy-loader.service';
import { HotelDetails } from '../../hotel/model/hotel-model';

/**
 * This directive lazy loades the features modules based on demand
*/
@Directive({
    selector: '[lazyLoad]',
})
export class LazyLoadModulesDirective implements OnInit, OnDestroy {
    @Input() moduleName: string;
    @Input() hotelDetails: HotelDetails;
    dynamicCompInstance: ComponentRef<any>;

    constructor(
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private injector: Injector,
        private el: ElementRef,
        private lazyLoaderService: LazyLoaderService
    ) { }

    ngOnInit() {
        // It lazily loads the module passed to it as input
        switch (this.moduleName) {
            case LazyLoadedModules.Hotel:
                this.lazyLoaderService.lazyLoadHotelModule().then((m) => {
                    this.insertComponent(m.HotelBookingComponent, this.hotelDetails);
                });
                break;
        }
    }
    /**
     * @internal 
     * It inserts the entry component of the lazy loaded module in the DOM
     * @param dynamicComponent 
     * @param data 
     */
    private insertComponent(dynamicComponent, componentInputData?: any): void {
        this.clearComponents();
        const componentFactory = this.resolver.resolveComponentFactory(dynamicComponent);
        this.dynamicCompInstance = this.vcr.createComponent(componentFactory, null, this.injector);
        if (componentInputData) {
            this.dynamicCompInstance.instance.inputDetails = componentInputData;
        }
        this.renderer.insertBefore(this.el.nativeElement, this.dynamicCompInstance.location.nativeElement, null);

        this.lazyLoaderService.dynamicComponentDetails.push({
            name: dynamicComponent.name,
            instance: this.dynamicCompInstance
        });
    }
    /**
     * It removes the dynamic component
     * @internal
     */
    private clearComponents(): void {
        if (this.dynamicCompInstance) {
            this.dynamicCompInstance.destroy();
            this.vcr.clear();
        }
    }

    ngOnDestroy() {
        this.clearComponents();
    }
}