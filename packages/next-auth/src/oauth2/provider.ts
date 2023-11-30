import type { Auth, LuciaError, Key } from 'lucia';

export type LuciaUser<OAuth2 extends Auth> = ReturnType<
  OAuth2['transformDatabaseUser']
>;

export type LuciaDatabaseUserAttributes<OAuth2 extends Auth> = Parameters<
  OAuth2['createUser']
>[0]['attributes'];

export class OAuth2ProviderUserAuth<OAuth extends Auth = Auth> {
  private auth: OAuth;
  private providerId: string;
  private providerUserId: string;

  constructor(auth: OAuth, providerId: string, providerUserId: string) {
    this.auth = auth;
    this.providerId = providerId;
    this.providerUserId = providerUserId;
  }

  public getExistingUser = async (): Promise<LuciaUser<OAuth> | null> => {
    try {
      const key = await this.auth.useKey(
        this.providerId,
        this.providerUserId,
        null
      );
      const user = await this.auth.getUser(key.userId);
      return user as LuciaUser<OAuth>;
    } catch (e) {
      const error = e as Partial<LuciaError>;
      if (error?.message !== 'AUTH_INVALID_KEY_ID') throw e;
      return null;
    }
  };

  public createKey = async (userId: string): Promise<Key> => {
    return await this.auth.createKey({
      userId,
      providerId: this.providerId,
      providerUserId: this.providerUserId,
      password: null,
    });
  };

  public createUser = async (options: {
    userId?: string;
    attributes: LuciaDatabaseUserAttributes<OAuth>;
  }): Promise<LuciaUser<OAuth>> => {
    const user = await this.auth.createUser({
      key: {
        providerId: this.providerId,
        providerUserId: this.providerUserId,
        password: null,
      },
      ...options,
    });
    return user as LuciaUser<OAuth>;
  };
}
