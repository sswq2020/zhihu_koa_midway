import { Inject, Controller, Post, Provide, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';
import { SuccessResponseInfo } from '../utils/basic.response';


@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user')
  async getUser(@Query() uid) {
    const user = await this.userService.getUser({ uid });
    return SuccessResponseInfo.success(user);
  }
}
