import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as cors from '@koa/cors';
import * as path from 'path';

@Configuration({
  imports: [
    koa,
  ],
  importConfigs: [
    path.join(__dirname, './config'),
  ],
})
export class ContainerConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    // 配置 CORS
    this.app.use(cors({
      origin: 'http://localhost:5173',  // 允许前端的地址
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'],
    }));
  }
}
