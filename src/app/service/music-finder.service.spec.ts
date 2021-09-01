import { TestBed } from '@angular/core/testing';

import { MusicFinderService } from './music-finder.service';

describe('MusicFinderService', () => {
  let service: MusicFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
