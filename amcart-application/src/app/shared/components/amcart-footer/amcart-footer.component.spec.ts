import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcartFooterComponent } from './amcart-footer.component';

describe('AmcartFooterComponent', () => {
  let component: AmcartFooterComponent;
  let fixture: ComponentFixture<AmcartFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcartFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcartFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
