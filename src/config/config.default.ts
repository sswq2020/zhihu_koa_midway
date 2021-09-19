import * as typegoose from '@midwayjs/typegoose';

export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb+srv://sswq:1991824sswq@zhihu.eavtl.mongodb.net/test?retryWrites=true&w=majority',
  options: {
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

export const secret = 'zhihu-jwt-secret';
