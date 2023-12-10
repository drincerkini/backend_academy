import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from '../organization.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';

describe('OrganizationService', () => {
  let service: OrganizationService;

  const mockOrganizationService = {
    findAll: jest.fn(),

    findOne: jest.fn(),

    create: jest.fn(),

    update: jest.fn(),

    remove: jest.fn(),

    getEmployeeFromOrganization: jest.fn(),

    addEmployeeToOrganization: jest.fn(),

    findUser: jest.fn(),

    deleteUserFromOrganization: jest.fn(),

    addLogoToOrganization: jest.fn(),
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

  it('should delete an organization and return the result', async () => {
    const mockOrganization = { id: 12, name: 'integration test case 5' };

    mockOrganizationService.remove.mockResolvedValue(mockOrganization);

    const existingId = 12;

    const result = await service.remove(existingId);

    expect(mockOrganizationService.remove).toHaveBeenCalled();

    expect(result).toEqual(mockOrganization);
  });

  it('should return employees from the organization', async () => {
    const mockOrganization = {
      id: 12,
      name: 'integration test case 5',
      employees: [
        {
          name: 'filan',
          email: 'fialn@gmail.com',
        },
        {
          name: 'update 10',
          email: 'update10@gmail.com',
        },
      ],
    };

    mockOrganizationService.getEmployeeFromOrganization.mockResolvedValue(
      mockOrganization,
    );

    const orgId = 12;

    const result = await service.getEmployeeFromOrganization(orgId);

    expect(
      mockOrganizationService.getEmployeeFromOrganization,
    ).toHaveBeenCalled();

    expect(result).toEqual(mockOrganization);
  });

  // it('should add employee to the organization', async () => {
  //   const mockOrganization = {
  //     id: 13,
  //     name: 'integration test case 6',
  //     employees: [],
  //   };

  //   mockOrganizationService.addEmployeeToOrganization.mockResolvedValue(
  //     mockOrganization,
  //   );

  //   const mockUser = {
  //     id: 3,
  //     email: 'fialn@gmail.com',
  //     name: 'filan',
  //   };

  //   mockOrganizationService.findUser.mockResolvedValue(mockUser);

  // });

  it('should remove an employee from an organization ', async () => {
    const mockOrganization = {
      id: 11,
      name: 'integration test case 4',
      employees: [
        {
          name: 'filan',
          email: 'fialn@gmail.com',
        },
      ],
    };
    mockOrganizationService.deleteUserFromOrganization.mockResolvedValue(
      mockOrganization,
    );
    const orgId = 11;
    const userId = 3;

    const result = await service.deleteUserFromOrganization(orgId, userId);

    expect(
      mockOrganizationService.deleteUserFromOrganization,
    ).toHaveBeenCalled();

    expect(result).toEqual(mockOrganization);
  });

  it('should add a logo to an organization and return that organization', async () => {});
});
