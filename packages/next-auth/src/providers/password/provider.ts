import { type Lucia } from '../../lucia/core.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { register } from './register.js';
import { validateRequest } from './validateRequest.js';

export class Password {
  private lucia: Lucia;

  constructor(lucia: Lucia) {
    this.lucia = lucia;
  }

  public async login(username: string, password: string) {
    return await login(this.lucia, username, password);
  }

  public async register(
    username: string,
    password: string,
    userAttributes?: object,
    authAttributes?: object
  ) {
    return await register(
      this.lucia,
      username,
      password,
      userAttributes,
      authAttributes
    );
  }

  public async logout() {
    return await logout(this.lucia);
  }

  public async validateRequest() {
    return await validateRequest(this.lucia);
  }
}
