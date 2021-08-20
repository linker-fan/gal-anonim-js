import fetch, { BodyInit, RequestInit } from 'node-fetch';

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

  async request<T>(
    url: string,
    method?: RequestMethod,
    body?: BodyInit
  ): Promise<T> {
    let init: RequestInit = { body, method };

    if (this._jwt) {
      init.headers = { Authorization: this._jwt };
    }

    const res = await fetch(`${this.baseUrl}${url}`, init);

    return res.json();
  }

  set jwt(v: string) {
    this._jwt = v;
  }
}

export default ApiClient;
