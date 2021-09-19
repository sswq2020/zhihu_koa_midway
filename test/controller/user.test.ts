import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

    it('should get /user', async () => {
      // create app
      const app = await createApp<Framework>();
  
      // make request
      const result = await createHttpRequest(app).get('/user');
  
      // use expect by jest
      expect(result.status).toBe(200);
      // expect(result.body.length > 0).toBe(true);
  
      // close app
      await close(app);
    });

  });