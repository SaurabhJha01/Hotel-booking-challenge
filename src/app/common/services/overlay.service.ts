import { Injectable, ElementRef } from '@angular/core';
import Overlay from 'ol/Overlay';
@Injectable({
  providedIn: 'root'
})
export class OverLayService {
  /**
   * It shows up the overlay which displays the plotted data point details
   *  @param overlay {{Overlay}}
   *  @param coordinate {{number}}
  */
  public openOverlay(overlay: Overlay, coordinate: number[]): void {
    // Set the position of overlay with regernce to map cooridnates
    overlay.setPosition(coordinate);
  }
  /**
   * It closes the overlay
   * @param overlay {{Overlay}}
   */
  public closeOverlay(overlay: Overlay): boolean {
    overlay.setPosition(undefined);
    return false;
  }
}
