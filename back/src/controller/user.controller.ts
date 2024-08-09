import { Provide, Post, Body, Inject, Controller } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body('username') username: string) {
    let user = await this.userService.getUser(username);
    if (!user) {
      user = await this.userService.createUser(username);
    }
    return user;
  }
}
