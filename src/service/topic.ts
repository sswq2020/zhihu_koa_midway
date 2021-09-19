import { Provide } from '@midwayjs/decorator';
import { TopicModel } from '../entity/topic';
@Provide()
export class TopicService {
  async getTopicList(query) {
    const { per_page = 10, page = 1, q } = query;
    const count = Math.max(per_page * 1, 1);
    const skipCount = (Math.max(page * 1, 1) - 1) * count;
    const list = TopicModel.find({ name: new RegExp(q) })
      .limit(count)
      .skip(skipCount)
      .exec();
    return list;
  }

  async findById(id: string, fields: string) {
    let topic = Object.create(null);
    if (!fields) {
      topic = await TopicModel.findById(id);
    } else {
      const selectFields = fields
        .split(';')
        .filter(f => f)
        .map(f => ' +' + f)
        .join('');
      topic = await TopicModel.findById(id).select(selectFields);
    }
    return topic;
  }

  async findOne(topic) {
    return await TopicModel.findOne(topic).exec();
  }

  async createNewTopic(topic) {
    return await new TopicModel(topic).save();
  }

  async updateTopic(id, topic) {
    return await TopicModel.findByIdAndUpdate(id, topic);
  }
}
