import { constantTimeEqual, generateRandomString, alphabet } from 'oslo/crypto';
import { encodeHex, decodeHex, base32 } from 'oslo/encoding';
import type { PasswordHashingAlgorithm } from 'oslo/password';
import { scrypt } from './scrypt.js';

export type { PasswordHashingAlgorithm } from 'oslo/password';

async function generateScryptKey(
  data: string,
  salt: string,
  blockSize = 16
): Promise<ArrayBuffer> {
  const encodedData = new TextEncoder().encode(data);
  const encodedSalt = new TextEncoder().encode(salt);
  return await scrypt(encodedData, encodedSalt, {
    N: 16384,
    r: blockSize,
    p: 1,
    dkLen: 64,
  });
}

export function generateId(length: number): string {
  return generateRandomString(length, alphabet('0-9', 'a-z', 'A-Z'));
}

export function generateIdFromEntropySize(size: number): string {
  const buffer = crypto.getRandomValues(new Uint8Array(size));
  return base32
    .encode(buffer, {
      includePadding: false,
    })
    .toLowerCase();
}

export class Scrypt implements PasswordHashingAlgorithm {
  async hash(password: string): Promise<string> {
    const salt = encodeHex(crypto.getRandomValues(new Uint8Array(16)));
    const key = await generateScryptKey(password.normalize('NFKC'), salt);
    return `${salt}:${encodeHex(key)}`;
  }
  async verify(hash: string, password: string): Promise<boolean> {
    const parts = hash.split(':');
    if (parts.length !== 2) return false;

    const [salt, key] = parts;
    const targetKey = await generateScryptKey(password.normalize('NFKC'), salt);
    return constantTimeEqual(targetKey, decodeHex(key));
  }
}
