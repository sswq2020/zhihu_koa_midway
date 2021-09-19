import { Provide } from '@midwayjs/decorator';
import {
  IMidwayKoaContext,
  IMidwayKoaNext,
  IWebMiddleware,
} from '@midwayjs/koa';
import { TopicModel } from '../entity/topic';

@Provide()
export class CheckTopicExitMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      // http://www.mongoosejs.net/docs/queries.html
      // Model 的方法中包含查询条件参数的（ find findById count update ）都可以按以下两种方式执行：
      // 传入 callback 参数，操作会被立即执行，查询结果被传给回调函数（ callback ）。
      // 不传 callback 参数，Query 的一个实例（一个 query 对象）被返回，这个 query 提供了构建查询器的特殊接口。
      const topic = await TopicModel.findById(ctx.params.id);
      if (!topic) {
        ctx.throw(404, '没有该话题');
      }
      ctx.state.topic = topic;
      await next();
    };
  }
}
