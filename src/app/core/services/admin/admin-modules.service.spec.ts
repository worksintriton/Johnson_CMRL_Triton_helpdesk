import { TestBed } from '@angular/core/testing';

import { AdminModulesService } from './admin-modules.service';

describe('AdminModulesService', () => {
  let service: AdminModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
