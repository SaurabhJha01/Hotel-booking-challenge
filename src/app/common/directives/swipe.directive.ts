import { Directive, ElementRef, Renderer2, OnDestroy, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { SliderSwipeService } from '../services/slider-swipe.service';

@Directive(
    { selector: '[mobileSwipe]' }
)
/* This directive is used to create a slide show on mobile device*/
export class SwipeDirective implements AfterViewInit, OnDestroy {
    isDragging: boolean;
    parentContainer: HTMLElement;
    @Input() slidesCount: number;
    @Output() swipeEnd: EventEmitter<number>;
    listenerTouchStart: () => void;
    listenerTouchMove: () => void;
    listenerTouchEnd: () => void;
    dragStartListener: () => void;

    constructor(private el: ElementRef,
        private renderer: Renderer2,
        private sliderSwipeService: SliderSwipeService) {
        this.swipeEnd = new EventEmitter<number>();
    }

    ngAfterViewInit() {
        this.parentContainer = this.el.nativeElement.parentElement;
        /**
         * Listener for user's swipe start
         */
        this.listenerTouchStart = this.renderer.listen(this.el.nativeElement, 'touchstart', (evt) => {
            this.isDragging = true;
            this.sliderSwipeService.startPos = evt.touches[0].clientX;     
        });
        /**
         * Listener for user's swipe move
         */
        this.listenerTouchMove = this.renderer.listen(this.el.nativeElement, 'touchmove', (evt) => {
            if (this.isDragging) {
                const currentPositon = evt.touches[0].clientX;
                this.sliderSwipeService.currentTranslate =
                    this.sliderSwipeService.prevTranslate + currentPositon - this.sliderSwipeService.startPos;
            }
        });
        /**
         * Listener when user has finished the swipe
         */
        this.listenerTouchEnd = this.renderer.listen(this.el.nativeElement, 'touchend', (evt) => {
            this.isDragging = false;
            const moveBy = this.sliderSwipeService.currentTranslate - this.sliderSwipeService.prevTranslate;
            // Moves the slider to the left
            if (moveBy < -10 && !this.sliderSwipeService.isLastSlideFromLeft(this.slidesCount)) {
                this.sliderSwipeService.currentIndex += 1;
                this.setSliderPosition();
            }
            // Moves the slider to the right
            if (moveBy > 100 && !this.sliderSwipeService.isLastSlideFromRight()) {
                this.sliderSwipeService.currentIndex -= 1;
                this.setSliderPosition();
            }

        });

        const imgElem = this.el.nativeElement.querySelector('img');
        // Disable image draging
        this.dragStartListener = this.renderer.listen(imgElem, 'dragstart', (event) => {
            event.preventDefault();
        })
    }
    /**
     * @internal
     * It sets the slider position based upon swipe
     */
    private setSliderPosition(): void {
        this.sliderSwipeService.currentTranslate = this.sliderSwipeService.currentIndex * -window.innerWidth;
        this.sliderSwipeService.prevTranslate = this.sliderSwipeService.currentTranslate;
        this.parentContainer.style.transform = `translateX(${this.sliderSwipeService.currentTranslate}px)`;
        this.swipeEnd.emit(this.sliderSwipeService.currentIndex);
    }

    ngOnDestroy() {
        if (this.listenerTouchStart) {
            this.listenerTouchStart();
        }
        if (this.listenerTouchMove) {
            this.listenerTouchMove();
        }
        if (this.listenerTouchEnd) {
            this.listenerTouchEnd();
        }
        if (this.dragStartListener) {
            this.dragStartListener();
        }
    }
}
