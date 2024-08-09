import { Provide } from '@midwayjs/decorator';

@Provide()
export class ProjectService {
  private projects = new Map<string, any>();

  async createProject(username: string, name: string) {
    const project = {
      id: Date.now(),
      name,
      username,
      tasks: [],  // 初始化空的任务列表
    };
    this.projects.set(`${username}-${project.id}`, project);
    return project;
  }

  async getProjects(username: string, projectId?: number) {
    if (projectId !== undefined) {
      return this.projects.get(`${username}-${projectId}`);
    }
    return Array.from(this.projects.values()).filter(project => project.username === username);
  }

  async addTaskToProject(username: string, projectId: number, task: any) {
    const project = this.projects.get(`${username}-${projectId}`);
    if (project) {
      project.tasks.push(task);  // 将任务添加到项目的任务列表中
      return task;
    }
    throw new Error('Project not found');
  }

  async getProjectTasks(username: string, projectId: number) {
    const project = this.projects.get(`${username}-${projectId}`);
    return project ? project.tasks : [];
  }
}
