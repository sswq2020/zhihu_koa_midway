import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import * as bodyParser from 'koa-bodyparser';
import * as typegoose from '@midwayjs/typegoose';
import * as staticCache from 'koa-static-cache';
import { join } from 'path';

@Configuration({
  conflictCheck: true,
  imports: [typegoose],
  importConfigs: [
    join(__dirname, './config'), // 加载配置文件（eggjs 下不需要）
  ],
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady() {
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
    this.app.use(
      staticCache({
        prefix: '/public/',
        dir: join(this.app.getAppDir(), 'public'),
      })
    );
  }
}
