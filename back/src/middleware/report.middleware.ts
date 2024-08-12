import { Provide, Middleware } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Provide()
@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const startTime = Date.now();
      await next();
      const endTime = Date.now();
      console.log(`Report in "${ctx.path}", rt = ${endTime - startTime}ms`);
    };
  }

  static getName(): string {
    return 'report';
  }
}
