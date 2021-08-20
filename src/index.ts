import ApiClient, { RequestMethod } from './api/client';
import { JwtPayload, LoginResult } from './interfaces/user';

// TODO: make this more DRY

/**
 * The main wrapper class.
 */
export class GalAnonim {
  private api: ApiClient;

  /**
   * Creates a new wrapper instance.
   * @param url URL to the server.
   */
  constructor(url: string) {
    this.api = new ApiClient(url);
  }

  /**
   * Creates a new account for the user.
   * @param username
   * @param password
   * @returns Status code - 201 if successfully created, 4xx/5xx if something failed
   */
  public async register(username: string, password: string): Promise<number> {
    const data = await this.api.request('/users/register', RequestMethod.POST, {
      username,
      password1: password,
      password2: password
    });

    return data.status;
  }

  /**
   * Logs the user in with given credentials.
   * @param username
   * @param password
   * @returns Status code - 200 if successfully logged in, 4xx/5xx if something failed
   */
  public async login(username: string, password: string): Promise<number> {
    const { status, json } = await this.api.request(
      '/users/login',
      RequestMethod.POST,
      {
        username,
        password
      }
    );

    const data = (await json()) as LoginResult;

    if (status >= 200 && status < 400) {
      this.api.jwt = data.token;
    }

    return status;
  }

  /**
   * Returns true if there is a jwt in axios headers
   */
  public get loggedIn(): boolean {
    return !!this.api.jwt;
  }

  /**
   * Returns info about the current user
   * @returns Current user's JWT payload.
   */
  public async me(): Promise<JwtPayload> {
    const { json } = await this.api.request('/protected/me');

    const data = (await json()) as JwtPayload;

    return data;
  }
}
