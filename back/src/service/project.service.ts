import { Provide } from '@midwayjs/decorator';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class ProjectService {
  private dataFilePath: string;
  private projects: Map<string, any>;

  constructor() {
    const dataDir = path.join(__dirname, '../data');
    this.dataFilePath = path.join(dataDir, 'projects.json');
    this.ensureDirectoryExistence(dataDir);
    this.loadProjectsFromFile();
  }

  // 确保目录存在，如果不存在则创建
  private ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // 从文件中加载项目数据
  private loadProjectsFromFile() {
    if (fs.existsSync(this.dataFilePath)) {
      const data = fs.readFileSync(this.dataFilePath, 'utf-8');
      this.projects = new Map(JSON.parse(data));
    } else {
      this.projects = new Map<string, any>();
    }
  }

  // 保存项目数据到文件
  private saveProjectsToFile() {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(Array.from(this.projects.entries()), null, 2));
  }

  async createProject(username: string, name: string) {
    const project = {
      id: Date.now(),
      name,
      username,
      tasks: [],
    };
    this.projects.set(`${username}-${project.id}`, project);
    this.saveProjectsToFile();
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
      project.tasks.push(task);
      this.saveProjectsToFile();
      return task;
    }
    throw new Error('Project not found');
  }

  async getProjectTasks(username: string, projectId: number) {
    const project = this.projects.get(`${username}-${projectId}`);
    return project ? project.tasks : [];
  }
}
