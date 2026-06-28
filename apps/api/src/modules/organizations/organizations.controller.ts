import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: Express.User,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return this.organizationsService.create(user.userId, createOrganizationDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: Express.User) {
    return this.organizationsService.findAll(user.userId);
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  getOne(@CurrentUser() user: Express.User, @Param('slug') slug: string) {
    return this.organizationsService.findOne(slug, user.userId);
  }
}
