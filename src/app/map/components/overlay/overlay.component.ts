import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Feature } from 'ol';
import Overlay from 'ol/Overlay';
import { OverLayOptions } from '../../../common/entities/map-config';
import { OlFactoryService } from '../../../common/services/ol-factory.service';
import { SliderSwipeService } from '../../../common/services/slider-swipe.service';
import { OverLayService } from '../../../common/services/overlay.service';
import { UtilityService } from '../../../common/services/utility.service';
/**
 * This component takes plotted data points details and showm them in an overlay
 */
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverLayComponent implements OnInit, OnDestroy {
  overlay: Overlay;
  isMobile: boolean;
  listenerCloseClick: () => void;
  @Input() public overlayData: OverLayOptions; // map instance and plotted data
  @Output() public highlightFeatureOnSwipe: EventEmitter<Feature>;
  @Output() public overlayFooterClick: EventEmitter<{ [key: string]: string }>;
  @ViewChild('overlayContainer', { static: true }) overlayContainer: ElementRef;

  constructor(private sliderSwipeService: SliderSwipeService,
    private overLayService: OverLayService,
    private utilityService: UtilityService) {
    this.highlightFeatureOnSwipe = new EventEmitter<Feature>();
    this.overlayFooterClick = new EventEmitter<{ [key: string]: string }>();
  }

  ngOnInit() {
    this.isMobile = this.utilityService.getDeviceType();
    // Create an overlay to show thed details of the selected data point
    this.overlay = OlFactoryService.getOverlay({
      element: this.overlayContainer.nativeElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    this.overlayData?.map.getOverlays().push(this.overlay);
    this.overLayService.openOverlay(this.overlay, this.overlayData.evt.coordinate);
    this.sliderSwipeService.setDefaultValues(this.overlayContainer.nativeElement);
  }
  /**
   * Handler to highlight the data point on swipe end
   * @param index {{number}}
   */
  swipEnd(index: number): void {
    const geoJonFtr: any = this.overlayData.features[index - 1];
    const features = this.overlayData.vectorSource.getFeatures();
    const sliderFeature = features.find(feature => {
      return feature?.getProperties().title === geoJonFtr?.properties.title
    });
    this.highlightFeatureOnSwipe.emit(sliderFeature);
  }
  /**
   * It opens up the form to book the hotel
   */
  overlayEmit(featureProps): void {
    this.overlayFooterClick.emit(featureProps);
  }

  ngOnDestroy(): void {
    if (this.listenerCloseClick) {
      this.listenerCloseClick();
    }
    this.overLayService.closeOverlay(this.overlay);
  }
}
