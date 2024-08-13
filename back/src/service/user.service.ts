import { Provide } from '@midwayjs/decorator';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class UserService {
  private users = new Map<string, any>();
  private dataFilePath: string;

  constructor() {
    const dataDir = path.join(__dirname, '../data');
    this.dataFilePath = path.join(dataDir, 'users.json');
    this.ensureDirectoryExistence(dataDir);
    this.loadUsersFromFile();
  }

  // 确保目录存在
  private ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // 加载用户数据从文件
  private loadUsersFromFile() {
    if (fs.existsSync(this.dataFilePath)) {
      const data = fs.readFileSync(this.dataFilePath, 'utf-8');
      this.users = new Map(JSON.parse(data));
      console.log('Users loaded successfully from', this.dataFilePath);
    } else {
      this.users = new Map<string, any>();
      console.log('No existing users file found, starting with an empty user list.');
    }
  }

  // 保存用户数据到文件
  private saveUsersToFile() {
    console.log('Saving users to file...');
    fs.writeFileSync(this.dataFilePath, JSON.stringify(Array.from(this.users.entries()), null, 2));
    console.log('Users saved successfully to', this.dataFilePath);
  }

  // 获取用户
  async getUser(username: string) {
    const user = this.users.get(username);
    console.log(`getUser called with username: ${username}, found:`, user);
    return user;
  }

  // 创建用户
  async createUser(username: string) {
    const user = {
      username,
      projects: [],
    };
    this.users.set(username, user);
    this.saveUsersToFile();
    console.log(`User ${username} created successfully.`);
    return user;
  }

  // 添加项目到用户
  async addProjectToUser(username: string, project: any) {
    const user = this.users.get(username);
    if (user) {
      user.projects.push(project);
      this.saveUsersToFile();
      console.log(`Project added to user ${username}:`, project);
    }
  }
}
