import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationDto } from './dto/organization.dto';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService, PrismaService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a new Organization', async () => {
    const createOrg: CreateOrganizationDto = {
      name: 'integration test case 9',
    };

    const result = await controller.create(createOrg);

    expect(result).toHaveProperty('id');

    expect(result).toEqual({
      id: expect.any(Number),
      name: createOrg.name,
      logo: null,
    });
  });

  it('should return a list of organizations', async () => {
    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.any(String) }),
      ]),
    );
  });

  it('should return a specific organization when providing a name', async () => {
    const orgName = 'drin';

    const result = (await controller.findAll(orgName)) as OrganizationDto;

    expect(result).toBeDefined();
    expect(result.name).toBe(orgName);
  });

  it('Should find one organization based on the Id', async () => {
    const testOrg = await prismaService.organization.create({
      data: {
        name: 'Test Org 3',
      },
    });

    const result = await controller.findOne(testOrg.id.toString());

    expect(result.id).toEqual(testOrg.id);
    expect(result.name).toEqual(testOrg.name);
  });
});
