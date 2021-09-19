// src/dto/topic.ts
import { Rule, RuleType } from '@midwayjs/decorator';

export class TopicDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string())
  avatar_url: string;

  @Rule(RuleType.string())
  introduction: string;
}

export class UpdateTopicDTO {
  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string())
  avatar_url: string;

  @Rule(RuleType.string())
  introduction: string;
}
