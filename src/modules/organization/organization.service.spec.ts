import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { OrganizationListDto } from './dto/organization.list.dto';

describe('OrganizationService', () => {
  let service: OrganizationService;

  const mockOrganizationService = {
    findAll: jest.fn(),

    findOne: jest.fn(),

    create: jest.fn((dto) => {
      const newOrg = {
        id: expect.any(Number),
        ...dto,
      };
      return newOrg;
    }),

    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockOrganizationService)
      .compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the list of organizations', async () => {
    const mockOrganizations = [
      { name: 'filan', numberOfEmployees: { employees: 2 } },
      { name: 'drin', numberOfEmployees: { employees: 4 } },
      { name: 'test', numberOfEmployees: { employees: 0 } },
      { name: 'not drin', numberOfEmployees: { employees: 0 } },
    ];

    mockOrganizationService.findAll.mockResolvedValueOnce(mockOrganizations);

    const result = await service.findAll();

    expect(mockOrganizationService.findAll).toHaveBeenCalledWith();

    expect(result).toEqual(mockOrganizations);
  });

  describe('findOne', () => {
    it('should return organization when found', async () => {
      const mockOrganization = { id: 1, name: 'drin' };

      mockOrganizationService.findOne.mockResolvedValueOnce(mockOrganization);

      const result = await service.findOne(1);

      expect(result).toEqual(mockOrganization);
    });
  });

  it('should create a new Organization', async () => {
    const dto = { name: 'new Organization' };
    expect(service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should update org', async () => {
    const dto = { name: 'dto' };

    expect(service.update(2, dto)).toEqual({
      id: 2,
      ...dto,
    });

    expect(mockOrganizationService.update).toHaveBeenCalled();
  });
});
