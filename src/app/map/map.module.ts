import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { MapBuilderComponent } from './components/map-builder/map-builder.component';
import { MapBuilderDirective } from './directives/map-builder.directive';
import { OverLayComponent } from './components/overlay/overlay.component';
import { FeatureInfoComponent } from './components/feature-info/feature-info.component';



@NgModule({
  declarations: [
    MapBuilderComponent,
    OverLayComponent,
    FeatureInfoComponent,
    MapBuilderDirective
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    CommonModule
  ],
  exports: [MapBuilderComponent]
})
export class MapModule { }
