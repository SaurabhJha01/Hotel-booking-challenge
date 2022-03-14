import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverLayComponent } from './overlay.component';

xdescribe('OverLayComponent', () => {
  let component: OverLayComponent;
  let fixture: ComponentFixture<OverLayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverLayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
