import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebloodbankComponent } from './deletebloodbank.component';

describe('DeletebloodbankComponent', () => {
  let component: DeletebloodbankComponent;
  let fixture: ComponentFixture<DeletebloodbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletebloodbankComponent]
    });
    fixture = TestBed.createComponent(DeletebloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
