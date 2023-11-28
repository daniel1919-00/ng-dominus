import { TestBed } from '@angular/core/testing';

import { DmxTableService } from './dmx-table.service';

describe('DmxTableService', () => {
  let service: DmxTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmxTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
