import fetch, { BodyInit, RequestInit } from 'node-fetch';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

class ApiClient {
  private jwt?: string;

  constructor(private baseUrl: string) {}

  async request<T>(
    url: string,
    method?: RequestMethod,
    body?: BodyInit
  ): Promise<T> {
    let init: RequestInit = { body, method };

    if (this.jwt) {
      init.headers = { Authorization: this.jwt };
    }

    const res = await fetch(`${this.baseUrl}${url}`, init);

    return res.json();
  }
}

export default ApiClient;
