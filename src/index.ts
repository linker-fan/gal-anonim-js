import axios, { AxiosInstance } from 'axios';
import { JwtPayload, LoginResult } from './interfaces/user';

// TODO: make this more DRY

/**
 * The main wrapper class.
 */
export class GalAnonim {
  private api: AxiosInstance;

  /**
   * Creates a new wrapper instance.
   * @param url URL to the server.
   */
  constructor(url: string) {
    this.api = axios.create({
      baseURL: url,
      withCredentials: false,
      validateStatus: () => true // requests will never throw an error
    });
  }

  /**
   * Creates a new account for the user.
   * @param username
   * @param password
   * @returns Status code - 201 if successfully created, 4xx/5xx if something failed
   */
  public async register(username: string, password: string): Promise<number> {
    const { status } = await this.api.post('/users/register', {
      username,
      password1: password,
      password2: password
    });

    return status;
  }

  /**
   * Logs the user in with given credentials.
   * @param username
   * @param password
   * @returns Status code - 200 if successfully logged in, 4xx/5xx if something failed
   */
  public async login(username: string, password: string): Promise<number> {
    const { status, data } = await this.api.post<LoginResult>('/users/login', {
      username,
      password
    });

    if (status >= 200 && status < 400) {
      this.api.defaults.headers.Authorization = `Bearer ${data.token}`;
      this.api.defaults.withCredentials = true;
    }

    return status;
  }

  /**
   * Returns true if there is a jwt in axios headers
   */
  public get loggedIn(): boolean {
    return !!this.api.defaults.headers.Authorization;
  }

  /**
   * Returns info about the current user
   * @returns Current user's JWT payload.
   */
  public async me(): Promise<JwtPayload> {
    const { data } = await this.api.get<JwtPayload>('/protected/me');

    return data;
  }
}
