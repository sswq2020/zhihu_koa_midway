// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/decorator';

export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string())
  avatar_url: string;

  @Rule(RuleType.string())
  headline: string;
}
