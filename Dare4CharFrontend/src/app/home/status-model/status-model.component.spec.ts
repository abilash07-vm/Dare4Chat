import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusModelComponent } from './status-model.component';

describe('StatusModelComponent', () => {
  let component: StatusModelComponent;
  let fixture: ComponentFixture<StatusModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
