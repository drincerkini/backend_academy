import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationModule],
  imports: [PrismaModule],
})
export class OrganizationModule {}
