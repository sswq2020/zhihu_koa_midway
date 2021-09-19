import { Init, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { UserModel } from '../entity/user';
// import { getModelForClass } from '@typegoose/typegoose';

@Provide()
export class UserService {
  // UserModel;

  @Init()
  async init() {
    // get model
    // this.UserModel = getModelForClass(User);
  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getUserList(query) {
    const { per_page = 10, page = 1, q } = query;
    const count = Math.max(per_page * 1, 1);
    const skipCount = (Math.max(page * 1, 1) - 1) * count;
    const list = UserModel.find({ name: new RegExp(q) })
      .limit(count)
      .skip(skipCount)
      .exec();
    return list;
  }

  async findById(id: string, fields: string) {
    let user = Object.create(null);
    if (!fields) {
      user = await UserModel.findById(id);
    } else {
      const selectFields = fields
        .split(';')
        .filter(f => f)
        .map(f => ' +' + f)
        .join('');
      const populateStr = fields
        .split(';')
        .filter(f => f)
        .map(f => {
          if (f === 'employments') {
            return 'employments.company employments.job';
          }
          if (f === 'educations') {
            return 'educations.school educations.major';
          }
          return f;
        })
        .join(' ');
      user = await UserModel.findById(id)
        .select(selectFields)
        .populate(populateStr);
    }
    return user;
  }

  async findOne(user) {
    return await UserModel.findOne(user).exec();
  }

  async createNewUser(user) {
    return await new UserModel(user).save();
  }

  async updateUser(id, user) {
    return await UserModel.findByIdAndUpdate(id, user).exec();
  }
}
