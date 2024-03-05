import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodbankComponent } from './bloodbank.component';

describe('BloodbankComponent', () => {
  let component: BloodbankComponent;
  let fixture: ComponentFixture<BloodbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodbankComponent]
    });
    fixture = TestBed.createComponent(BloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
