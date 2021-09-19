import { getModelForClass, prop } from '@typegoose/typegoose';

export class Topic {
  @prop({ select: false })
  public __v: string;

  @prop({ required: true })
  public name: string;

  @prop()
  public avatar_url: string;

  @prop({ select: false })
  introduction: string;
}

export const TopicModel = getModelForClass(Topic);
