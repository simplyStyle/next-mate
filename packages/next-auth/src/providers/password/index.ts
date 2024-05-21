import { type Lucia } from '../../lucia/core.js';
import { Password } from './provider.js';

interface IConfig {
  lucia: Lucia;
}

export const createPasswordProvider = (config: IConfig) => {
  const { lucia } = config;
  return new Password(lucia);
};
