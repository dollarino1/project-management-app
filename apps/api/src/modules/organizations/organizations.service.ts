import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationWithMembers } from '../../common/types/prisma.types';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    dto: CreateOrganizationDto,
  ): Promise<OrganizationWithMembers> {
    const existing = await this.prisma.organization.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('Slug already in use');
    }

    const organization = await this.prisma.organization.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        members: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },
      include: { members: true },
    });
    this.logger.log(`Organization created: ${organization.id}`);

    return organization;
  }

  async findAll(userId: string): Promise<OrganizationWithMembers[]> {
    const organizations = await this.prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return organizations;
  }

  async findOne(
    slug: string,
    userId: string,
  ): Promise<OrganizationWithMembers> {
    const organization = await this.prisma.organization.findUnique({
      where: { slug },
      include: { members: true },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const isMember = organization.members.some(
      (member) => member.userId === userId,
    );
    if (!isMember) {
      throw new ForbiddenException('Access denied');
    }

    return organization;
  }
}
