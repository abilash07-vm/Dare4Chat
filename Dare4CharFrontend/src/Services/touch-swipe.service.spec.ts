import { TestBed } from '@angular/core/testing';

import { TouchSwipeService } from './touch-swipe.service';

describe('TouchSwipeService', () => {
  let service: TouchSwipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchSwipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
