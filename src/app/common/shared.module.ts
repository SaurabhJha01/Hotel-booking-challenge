import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SwipeDirective } from './directives/swipe.directive';
import { CommonModule } from '@angular/common';
import { LazyLoadModulesDirective } from './directives/lazy-load-modules.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SwipeDirective,
    LazyLoadModulesDirective
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule, SwipeDirective, LazyLoadModulesDirective]
})
export class SharedModule { }
