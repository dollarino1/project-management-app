import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('organizations/:slug/projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: Express.User,
    @Param('slug') slug: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(user.userId, slug, createProjectDto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: Express.User, @Param('slug') slug: string) {
    return this.projectService.findAll(user.userId, slug);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  getOne(
    @CurrentUser() user: Express.User,
    @Param('slug') slug: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.findOne(user.userId, slug, projectId);
  }
}
