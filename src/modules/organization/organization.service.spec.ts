import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

describe('OrganizationService', () => {
  let service: OrganizationService;

  const mockOrganizationService = {
    findAll: jest.fn(),

    findOne: jest.fn(),

    create: jest.fn(),

    update: jest.fn(),
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

  it('should return organization when found', async () => {
    const mockOrganization = { id: 1, name: 'drin' };

    mockOrganizationService.findOne.mockResolvedValueOnce(mockOrganization);

    const result = await service.findOne(1);

    expect(result).toEqual(mockOrganization);
  });

  it('should create a new Organization', async () => {
    const createDto: CreateOrganizationDto = { name: 'new Org' };
    mockOrganizationService.create.mockResolvedValue(createDto);

    const result = await service.create(createDto);

    expect(result).toEqual(createDto);

    expect(mockOrganizationService.create).toHaveBeenCalled();
  });

  it('should update org', async () => {
    const updateDto: UpdateOrganizationDto = {
      name: 'test case',
    };

    const mockUpdatedOrg = { id: 1, name: 'drin', ...updateDto };

    mockOrganizationService.update.mockResolvedValue(mockUpdatedOrg);

    const result = await service.update(1, updateDto);

    expect(result).toEqual(mockUpdatedOrg);

    expect(mockOrganizationService.update).toHaveBeenCalled();
  });
});
