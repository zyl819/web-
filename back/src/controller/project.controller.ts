import { Provide, Post, Body, Param, Inject, Controller, Get } from '@midwayjs/decorator';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/')
export class ProjectController {
  @Inject()
  projectService: ProjectService;

  @Inject()
  userService: UserService;

  @Get('/projects/:username')
  async getProjects(@Param('username') username: string, @Param('projectId') projectId?: number) {
    const user = await this.userService.getUser(username);
    if (user) {
      return this.projectService.getProjects(username, projectId);
    }
    return [];
  }

  @Post('/projects')
  async createProject(@Body() body: { username: string, name: string }) {
    let user = await this.userService.getUser(body.username);
    if (!user) {
      user = await this.userService.createUser(body.username);
    }
    const project = await this.projectService.createProject(body.username, body.name);
    await this.userService.addProjectToUser(body.username, project);
    return project;
  }

  @Post('/projects/:projectId/tasks')
  async addTask(@Param('projectId') projectId: number, @Body() body: { username: string, title: string, description: string, status: string, attachments: any[] }) {
    const task = {
      id: Date.now(),
      title: body.title,
      description: body.description,
      status: body.status,
      attachments: body.attachments,
    };
    await this.projectService.addTaskToProject(body.username, projectId, task);
    return task;
  }

  @Get('/projects/:projectId/tasks')
  async getTasks(@Param('projectId') projectId: number, @Body('username') username: string) {
    return this.projectService.getProjectTasks(username, projectId);
  }
}
