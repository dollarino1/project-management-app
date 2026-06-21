import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';

@Module({
  imports: [AuthModule, PrismaModule, OrganizationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
