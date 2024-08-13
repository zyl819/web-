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

    private ensureDirectoryExistence(dirPath: string) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    private saveProjectsToFile() {
        console.log('Saving projects to file...');
        fs.writeFileSync(this.dataFilePath, JSON.stringify(Array.from(this.projects.entries()), null, 2));
        console.log('Projects saved successfully to', this.dataFilePath);
      }
      
    
      private loadProjectsFromFile() {
        if (fs.existsSync(this.dataFilePath)) {
          const data = fs.readFileSync(this.dataFilePath, 'utf-8');
          this.projects = new Map(JSON.parse(data));
          console.log('Projects loaded successfully from', this.dataFilePath);
        } else {
          this.projects = new Map<string, any>();
          console.log('No existing projects file found, starting with an empty project list.');
        }
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
      
      async updateTaskStatus(username: string, projectId: number, taskId: number, newStatus: string) {
        const project = this.projects.get(`${username}-${projectId}`);
        if (!project) throw new Error('Project not found');
        const task = project.tasks.find(task => task.id === taskId);
        if (!task) throw new Error('Task not found');
        task.status = newStatus;
        this.saveProjectsToFile();
        return task;
      }
      
    
}
