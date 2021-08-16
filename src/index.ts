import axios, { AxiosInstance } from 'axios';

/**
 * The main wrapper class.
 */
class GalAnonim {
  private api: AxiosInstance;

  /**
   * Creates a new wrapper instance.
   * @param url URL to the server.
   */
  constructor(url: string) {
    let baseURL = url;

    // remove the trailing slash
    if (baseURL.endsWith('/')) {
      baseURL = baseURL.slice(0, baseURL.length);
    }

    this.api = axios.create({
      baseURL,
      validateStatus: () => true // requests will never throw an error
    });
  }

  /**
   * Creates a new account for the user.
   * @param username
   * @param password
   * @returns Status code - 201 if successfully created, 4xx/5xx if something failed
   */
  public async register(username: string, password: string) {
    const { status } = await this.api.post('/users/register', {
      username,
      password1: password,
      password2: password
    });

    return status;
  }
}

export default GalAnonim;
