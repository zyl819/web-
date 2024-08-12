import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: 'my_key',  // 应用程序的密钥
  koa: {
    port: 7001,  // Koa 服务器的端口
  },
} as MidwayConfig;
