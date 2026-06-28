import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { Organization } from '@repo/types';
import { OrganizationResponseDto } from './dto/organization-response.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: Express.User,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationsService.create(
      user.userId,
      createOrganizationDto,
    );

    return OrganizationResponseDto.fromEntity(organization);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: Express.User): Promise<Organization[]> {
    const organizations = await this.organizationsService.findAll(user.userId);

    return organizations.map((org) => OrganizationResponseDto.fromEntity(org));
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @CurrentUser() user: Express.User,
    @Param('slug') slug: string,
  ): Promise<Organization> {
    const organization = await this.organizationsService.findOne(
      slug,
      user.userId,
    );

    return OrganizationResponseDto.fromEntity(organization);
  }
}
