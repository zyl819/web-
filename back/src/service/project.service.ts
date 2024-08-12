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

    private loadProjectsFromFile() {
        console.log('Loading projects from file:', this.dataFilePath); // 调试信息
        if (fs.existsSync(this.dataFilePath)) {
            const data = fs.readFileSync(this.dataFilePath, 'utf-8');
            this.projects = new Map(JSON.parse(data));
            console.log('Projects loaded successfully:', this.projects); // 打印加载的项目数据
        } else {
            this.projects = new Map<string, any>();
            console.log('No existing projects found, initializing new Map.'); // 初始化信息
        }
    }

    private saveProjectsToFile() {
        console.log('Saving projects to file...'); // 调试信息
        fs.writeFileSync(this.dataFilePath, JSON.stringify(Array.from(this.projects.entries()), null, 2));
        console.log('Projects saved successfully.'); // 保存成功信息
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
        console.log(`Project created for user ${username}:`, project); // 项目创建信息
        return project;
    }

    async getProjects(username: string, projectId?: number) {
        console.log(`Fetching projects for user: ${username}, projectId: ${projectId}`); // 调试信息
        if (projectId !== undefined) {
            const project = this.projects.get(`${username}-${projectId}`);
            console.log(`Returning specific project:`, project); // 返回单个项目的信息
            return project;
        }
        const userProjects = Array.from(this.projects.values()).filter(project => project.username === username);
        console.log(`Returning all projects for user ${username}:`, userProjects); // 返回所有项目的信息
        return userProjects;
    }

    async addTaskToProject(username: string, projectId: number, task: any) {
        console.log(`Adding task to project ${projectId} for user ${username}:`, task); // 调试信息
        const project = this.projects.get(`${username}-${projectId}`);
        if (project) {
            project.tasks.push(task);
            this.saveProjectsToFile();
            console.log(`Task added successfully to project ${projectId}.`); // 任务添加成功信息
            return task;
        }
        throw new Error('Project not found');
    }

    async getProjectTasks(username: string, projectId: number) {
        console.log(`Fetching tasks for project ${projectId} for user ${username}`); // 调试信息
        const project = this.projects.get(`${username}-${projectId}`);
        const tasks = project ? project.tasks : [];
        console.log(`Tasks for project ${projectId}:`, tasks); // 打印项目任务
        return tasks;
    }
}
