import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcartHeaderComponent } from './amcart-header.component';

describe('AmcartHeaderComponent', () => {
  let component: AmcartHeaderComponent;
  let fixture: ComponentFixture<AmcartHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcartHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
