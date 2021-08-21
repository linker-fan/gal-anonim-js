import 'isomorphic-fetch';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

class ApiClient {
  private _jwt?: string;

  constructor(private baseUrl: string) {}

  async request(url: string, method?: RequestMethod, body?: any) {
    let init: any = {
      body: JSON.stringify(body),
      method
    };

    if (this._jwt) {
      init.headers = { Authorization: this._jwt };
    }

    return await fetch(`${this.baseUrl}${url}`, init);
  }

  set jwt(v: string) {
    this._jwt = v;
  }
}

export default ApiClient;
