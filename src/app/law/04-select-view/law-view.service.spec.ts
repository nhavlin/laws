import { TestBed } from '@angular/core/testing';

import { LawViewService } from './law-view.service';

describe('LawViewService', () => {
  let service: LawViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
