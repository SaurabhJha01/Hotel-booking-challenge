import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.css']
})
/**
 * This is a presentation component to dislay feature information
 */
export class FeatureInfoComponent{
  @Input() featureInfo: any;
  @Output() footerBtnEmit: EventEmitter<void>;

  constructor() {
    this.footerBtnEmit = new EventEmitter<void>();
  }
  onBtnClick(): void {
    this.footerBtnEmit.emit();
  }
}
