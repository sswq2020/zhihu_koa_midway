class BasicResponseInfo {
  success: boolean;
  message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

export class SuccessResponseInfo extends BasicResponseInfo {
  static instance: SuccessResponseInfo;
  data: any;
  code: number;
  constructor(code, data) {
    super(true, 'OK');
    this.code = code;
    this.data = data;
  }

  static success(data, code = 200) {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new SuccessResponseInfo(code, data);
      return this.instance;
    }
  }
}

export class FailResponseInfo extends BasicResponseInfo {
  static instance: FailResponseInfo;
  data: any;
  code: number;
  constructor(code, data) {
    super(false, 'Fail');
    this.code = code;
    this.data = data;
  }

  static fail(data, code) {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new FailResponseInfo(code, data);
      return this.instance;
    }
  }
}
