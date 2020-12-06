import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcartPageNotFoundComponent } from './amcart-page-not-found.component';

describe('AmcartPageNotFoundComponent', () => {
  let component: AmcartPageNotFoundComponent;
  let fixture: ComponentFixture<AmcartPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcartPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcartPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
