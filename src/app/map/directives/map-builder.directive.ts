import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { StringConstants } from '../../common/entities/constants';

/******
 * This directive handles the map related dom manipulation 
********/
@Directive(
    { selector: '[pbMapDir]' }
)

export class MapBuilderDirective implements AfterViewInit {
    constructor(private el: ElementRef,
        private renderer: Renderer2,
        private mapService: MapService) { }
    /**
     * Adjust the map height on screen resize
    */
    @HostListener('window:resize', ['$event'])
    resizeWindow() {
        this.setMapHeight();
    }

    ngAfterViewInit() {
        this.setMapHeight();
        this.setCursorTypeOnMap(StringConstants.CURSOR_TYPES.POINTER);
    }
    /**
     * It sets the type of selection on the map
     * @param type 
     */
    private setCursorTypeOnMap(type: string): void {
        const viewPort = this.el.nativeElement.getElementsByClassName('ol-viewport')[0];
        if (viewPort) {
            this.renderer.setStyle(viewPort, 'cursor', type);
        }
    }
    /**
     * Sets the height of map
     * @returns void
    */
    private setMapHeight(): void {
        const height = Number(window.innerHeight - StringConstants.BANNER_DEFAULT_HEIGHT);
        this.renderer.setStyle(this.el.nativeElement, 'height', height + 'px');
        this.mapService.getMap().updateSize();
    };   
}
