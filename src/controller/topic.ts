import { Context } from '@midwayjs/koa';
import {
  Controller,
  Get,
  Inject,
  Provide,
  Query,
  ALL,
  Post,
  Body,
  Patch,
} from '@midwayjs/decorator';
import { TopicService } from '../service/topic';
import { TopicDTO, UpdateTopicDTO } from '../dto/topic';
import { FailResponseInfo, SuccessResponseInfo } from '../utils/basic.response';

@Provide()
@Controller('/topics')
export class TopicController {
  @Inject()
  ctx: Context;

  @Inject()
  topicService: TopicService;

  @Get('/')
  async getTopicList(@Query(ALL) query: any) {
    const data = await this.topicService.getTopicList(query);
    return SuccessResponseInfo.success(data);
  }

  @Post('/', { middleware: ['authMiddleware'] })
  async createTopic(@Body(ALL) topic: TopicDTO) {
    const { name } = topic;
    const repeatTopic = await this.topicService.findOne({ name });
    if (repeatTopic) {
      return FailResponseInfo.fail('话题已存在', 409);
    }
    return await this.topicService.createNewTopic(topic);
  }

  @Patch('/:id', { middleware: ['authMiddleware', 'checkTopicExitMiddleware'] })
  async updateTopic(@Body(ALL) topicBody: UpdateTopicDTO) {
    const topic = await this.ctx.state.topic.updateOne(topicBody);

    if (!topic) {
      this.ctx.throw(404, '话题不存在');
    }
    return SuccessResponseInfo.success('话题更新成功', 204);
  }
}
