import { Controller, Get, Post, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {
  @Get('/', { middleware: ['reportMiddleware'] })
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/test')
  async test(): Promise<string> {
    return 'test middleware';
  }

  @Post('/update')
  async updateData() {
    return 'this is a post method';
  }
}
