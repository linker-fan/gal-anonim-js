import axios, { AxiosInstance } from 'axios';

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
    const { status } = await this.api.post('/users/login', {
      username,
      password
    });

    if (status >= 200 && status < 400) {
      this.api.defaults.withCredentials = true;
    }

    return status;
  }

  /**
   * Returns true if the user is logged in
   */
  public get loggedIn(): boolean {
    return this.api.defaults.withCredentials ?? false;
  }
}
