import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserService {
  private users = new Map<string, any>();

  // 获取用户
  async getUser(username: string) {
    return this.users.get(username);
  }

  // 创建用户
  async createUser(username: string) {
    const user = {
      username,
      projects: [],
    };
    this.users.set(username, user);
    return user;
  }

  // 添加项目到用户
  async addProjectToUser(username: string, project: any) {
    const user = this.users.get(username);
    if (user) {
      user.projects.push(project);
    }
  }
}
