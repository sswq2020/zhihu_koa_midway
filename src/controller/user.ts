import {
  Controller,
  Inject,
  Post,
  Provide,
  Query,
  ALL,
  Body,
  Get,
  Validate,
  Param,
  Patch,
} from '@midwayjs/decorator';
import jsonwebtoken = require('jsonwebtoken');
import { Context } from '@midwayjs/koa';
import { UserDTO } from '../dto/user';
import { UserService } from '../service/user';
import { FailResponseInfo, SuccessResponseInfo } from '../utils/basic.response';
import { secret } from './../config/config.default';

@Provide()
@Controller('/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/')
  async getUserList(@Query(ALL) query: any) {
    const data = await this.userService.getUserList(query);
    return SuccessResponseInfo.success(data);
  }

  @Post('/')
  @Validate()
  async createUser(@Body(ALL) user: UserDTO) {
    const { name } = user;
    const repeatUser = await this.userService.findOne({ name });
    if (repeatUser) {
      return FailResponseInfo.fail('用户已占用', 409);
    }
    return await this.userService.createNewUser(user);
  }

  @Post('/login')
  async login(@Body(ALL) body) {
    const user = await this.userService.findOne(body);
    if (!user) {
      return FailResponseInfo.fail('用户名或者密码不正确', 401);
    }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
    return { token };
  }

  @Get('/:uid')
  async findSpecificUser(@Param() uid: string, @Query() fields: string) {
    const user = await this.userService.findById(uid, fields);
    if (!user) {
      return FailResponseInfo.fail('用户不存在', 404);
    }
    return SuccessResponseInfo.success(user);
  }

  @Patch('/:uid', { middleware: ['authMiddleware'] })
  async update(@Body(ALL) body, @Param() uid) {
    const user = await this.userService.updateUser(uid, body);
    if (!user) {
      return FailResponseInfo.fail('用户不存在', 404);
    }
    return user;
  }
}
