import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationWithMembers } from '../../common/types/prisma.types';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async verifyMembership(
    userId: string,
    orgSlug: string,
  ): Promise<OrganizationWithMembers> {
    const organization = await this.prisma.organization.findUnique({
      where: { slug: orgSlug },
      include: { members: true },
    });

    if (!organization) {
      throw new NotFoundException(`Organization: ${orgSlug} not found`);
    }

    const isMember = organization.members.some(
      (member) => member.userId === userId,
    );
    if (!isMember) {
      throw new ForbiddenException('Access denied');
    }

    return organization;
  }

  async create(
    userId: string,
    orgSlug: string,
    dto: CreateProjectDto,
  ): Promise<Project> {
    const organization = await this.verifyMembership(userId, orgSlug);

    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        organizationId: organization.id,
      },
    });

    this.logger.log(`Project created: ${project.id} in org: ${orgSlug}`);

    return project;
  }

  async findAll(userId: string, orgSlug: string): Promise<Project[]> {
    const organization = await this.verifyMembership(userId, orgSlug);

    const projects = await this.prisma.project.findMany({
      where: { organizationId: organization.id },
    });

    return projects;
  }

  async findOne(
    userId: string,
    orgSlug: string,
    projectId: string,
  ): Promise<Project> {
    const organization = await this.verifyMembership(userId, orgSlug);

    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        organizationId: organization.id,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Project doesnt exist in organization: ' + orgSlug,
      );
    }

    return project;
  }
}
