import { Injectable } from '@angular/core';
import Overlay, { Options as OverlayOptions } from 'ol/Overlay';
/* styles */
import Icon, { Options as IconOptions } from 'ol/style/Icon';
import Style, { Options as StyleOptions } from 'ol/style/Style';

/* sources */
import Vector, { Options as VectorOptions } from 'ol/source/Vector';

/* layers */
import { Options as BaseVectorLayerOptions } from 'ol/layer/BaseVector';
import VectorLayer from 'ol/layer/Vector';

@Injectable({
  providedIn: 'root'
})
export class OlFactoryService {
  /**
   * This function provides new instance of Vector
   * @param options VectorOptions
   * @return object Vector
   */
  public static getVectorLayer(options: BaseVectorLayerOptions): VectorLayer {
    return new VectorLayer(options);
  }
  /**
   * This function provides new instance of Vector
   * @param options VectorOptions
   * @return object Vector
   */
  public static getVectorSource(options: VectorOptions): Vector {
    return new Vector(options);
  }
  /**
   * This function provides new instance of Icon
   * @param options IconOptions
   * @return object Icon
   */
  public static getIconStyle(options: IconOptions): Icon {
    return new Icon(options);
  }

  /**
   * It provides new instance of Style
   * @param options {{StyleOptions}}
   */
  public static getStyle(options?: StyleOptions): Style {
    return new Style(options);
  }
  /**
   * It provides new instance of Overlay
   * @param options {{OverlayOptions}}
   */
  public static getOverlay(options: OverlayOptions): Overlay {
    return new Overlay(options);
  }

}
