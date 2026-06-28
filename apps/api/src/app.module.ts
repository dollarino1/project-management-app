import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [AuthModule, PrismaModule, OrganizationsModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
