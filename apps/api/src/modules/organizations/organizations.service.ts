import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrganizationDto) {
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
    });

    return organization;
  }

  async findAllForUser(userId: string) {
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

  async findBySlug(slug: string, userId: string) {
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
