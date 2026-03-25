import type { CollectionConfig } from 'payload';

export const Passkeys: CollectionConfig = {
  slug: 'passkeys',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'publicKey', type: 'text', required: true },
    { name: 'userId', type: 'text', required: true, index: true },
    { name: 'credentialID', type: 'text', required: true },
    { name: 'webauthnUserID', type: 'text', required: true },
    { name: 'counter', type: 'number', required: true },
    { name: 'deviceType', type: 'text', required: true },
    { name: 'backedUp', type: 'checkbox', required: true },
    { name: 'transports', type: 'text' },
  ],
};