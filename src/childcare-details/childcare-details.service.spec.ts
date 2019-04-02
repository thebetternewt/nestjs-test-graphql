import { Test, TestingModule } from '@nestjs/testing';
import { ChildcareDetailsService } from './childcare-details.service';

describe('ChildcareDetailsService', () => {
  let service: ChildcareDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildcareDetailsService],
    }).compile();

    service = module.get<ChildcareDetailsService>(ChildcareDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
