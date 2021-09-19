import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Topic } from './topic';

class Employment {
  @prop({ ref: () => Topic })
  company: Ref<Topic>;

  @prop({ ref: () => Topic })
  job: Ref<Topic>;
}

class Educations {
  @prop({ ref: () => Topic })
  school: Ref<Topic>;

  @prop({ ref: () => Topic })
  major: Ref<Topic>;

  @prop({ enum: [1, 2, 3, 4, 5] })
  diploma: number;

  @prop()
  entrance_year: number;

  @prop()
  graduation_year: number;
}

export class User {
  @prop({ select: false })
  public __v: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true, select: false })
  public password: string;

  @prop()
  public avatar_url: string;

  @prop({ enum: ['male', 'female'], default: 'male', required: true })
  public gender: string;

  @prop()
  public headline: string;

  @prop({ ref: () => Topic, select: false })
  public locations: Ref<Topic>[];

  @prop({ ref: () => Topic, select: false })
  public business: Ref<Topic>;

  @prop({ type: () => Employment, select: false })
  public employments: Employment[];

  @prop({ type: () => Educations, select: false })
  public educations: Educations[];
}

export const UserModel = getModelForClass(User);
