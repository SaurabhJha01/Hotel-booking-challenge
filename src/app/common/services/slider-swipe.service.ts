import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * It is a worker service for swipe slider
 */
export class SliderSwipeService {
    startPos: number;
    currentTranslate: number;
    prevTranslate: number;
    currentIndex: number;
    constructor() {
        this.setDefaultValues();
    }
    /**
     * It resets the slide values when user finishes the swipe
     * @param slider {{HTMLElement}}
     */
    setDefaultValues(slider?: HTMLElement): void {
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.currentIndex = 0;
        if (slider) {
            slider.style.transform = `translateX(${this.currentTranslate}px)`;
        }
    }
    /**
     * It chekcs whether the last slide has been reached upon left swipe.
     * 
    */
    isLastSlideFromLeft(slidesCount): boolean {
       return this.currentIndex === (slidesCount - 1);
    }
    /**
     * It chekcs whether the last slide has been reached  upon right swipe.
     * 
    */
    isLastSlideFromRight(): boolean {
        return this.currentIndex === 0;
    }
}

