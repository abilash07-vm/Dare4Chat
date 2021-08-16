import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateChatModelComponent } from './date-chat-model.component';

describe('DateChatModelComponent', () => {
  let component: DateChatModelComponent;
  let fixture: ComponentFixture<DateChatModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateChatModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateChatModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
