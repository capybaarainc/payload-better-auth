import type { CollectionConfig } from 'payload';

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'accountId', type: 'text', required: true },
    { name: 'providerId', type: 'text', required: true },
    { name: 'userId', type: 'text', required: true, index: true },
    { name: 'accessToken', type: 'text' },
    { name: 'refreshToken', type: 'text' },
    { name: 'idToken', type: 'text' },
    { name: 'accessTokenExpiresAt', type: 'date' },
    { name: 'refreshTokenExpiresAt', type: 'date' },
    { name: 'scope', type: 'text' },
    { name: 'password', type: 'text' },
  ],
};
