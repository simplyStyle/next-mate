import { OAuthRequestError } from '@lucia-auth/oauth';

export const handleRequest = async <
  ResponseBody extends {
    //
  },
>(
  request: Request
): Promise<ResponseBody> => {
  request.headers.set('User-Agent', 'lucia');
  request.headers.set('Accept', 'application/json');
  const response = await fetch(request);
  if (!response.ok) {
    throw new OAuthRequestError(request, response);
  }
  return (await response.json()) as ResponseBody;
};

export const ensureSlash = (
  str: string,
  options: { slashEndfix?: boolean; slashPrefix?: boolean } = {
    slashEndfix: false,
  }
): string => {
  str = str.replace(/\/$/, '');
  if (typeof options.slashPrefix !== 'undefined') {
    str = str.replace(/^\//, '');
  }
  str = options.slashEndfix ? str + '/' : str;
  str = options.slashPrefix ? '/' + str : str;
  return str;
};

export const createUrl = (
  url: string | URL,
  urlSearchParams: Record<string, string | undefined>
): URL => {
  const newUrl = new URL(url);
  for (const [key, value] of Object.entries(urlSearchParams)) {
    if (!value) continue;
    newUrl.searchParams.set(key, value);
  }
  return newUrl;
};

export const authorizationHeader = (
  type: 'bearer' | 'basic',
  token: string
): string => {
  if (type === 'basic') {
    return ['Basic', token].join(' ');
  }
  if (type === 'bearer') {
    return ['Bearer', token].join(' ');
  }
  throw new TypeError('Invalid token type');
};

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyz1234567890';

export const generateRandomString = (
  length: number,
  alphabet: string = DEFAULT_ALPHABET
) => {
  const randomUint32Values = new Uint32Array(length);
  crypto.getRandomValues(randomUint32Values);
  const u32Max = 0xffffffff;
  let result = '';
  for (let i = 0; i < randomUint32Values.length; i++) {
    const rand = randomUint32Values[i]! / (u32Max + 1);
    result += alphabet[Math.floor(alphabet.length * rand)];
  }
  return result;
};
