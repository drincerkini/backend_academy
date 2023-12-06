import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get Hello', () => {
    it('Should return Hello World!', async () => {
      const result = 'Hello World!';
      jest.spyOn(userService, 'getHello').mockImplementation(() => result);

      expect(userService.getHello()).toBe(result);
    });
  });
});
