import { Provide, Post, Body, Param, Inject, Controller, Get, Query } from '@midwayjs/decorator';
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
    console.log('Received request to create project:', body);
    let user = await this.userService.getUser(body.username);
    if (!user) {
      console.log('User not found, creating new user:', body.username);
      user = await this.userService.createUser(body.username);
    }
    
    if (user) {
      const project = await this.projectService.createProject(body.username, body.name);
      await this.userService.addProjectToUser(body.username, project);
      console.log('Project created successfully:', project);
      return project;
    }
    return { message: 'User not found' };
  }

  @Post('/projects/:projectId/tasks')
  async addTask(@Param('projectId') projectId: number, @Body() body: { username: string, title: string, description: string, status: string, deadline: string, attachments: any[] }) {
    const task = {
        id: Date.now(),
        title: body.title,
        description: body.description,
        status: body.status,
        deadline: body.deadline,
        attachments: body.attachments,
    };

    await this.projectService.addTaskToProject(body.username, projectId, task);
    return task;
}

@Get('/projects/:projectId/tasks')
async getTasks(@Param('projectId') projectId: number, @Query('username') username: string) {
  console.log(`Fetching tasks for project ${projectId} for user ${username}`);
  return this.projectService.getProjectTasks(username, projectId);
}

}
