import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModelComponent } from './profile-model.component';

describe('ProfileModelComponent', () => {
  let component: ProfileModelComponent;
  let fixture: ComponentFixture<ProfileModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
