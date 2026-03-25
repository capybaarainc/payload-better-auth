import type { CollectionConfig } from 'payload';

export const Verifications: CollectionConfig = {
  slug: 'verifications',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'identifier', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'expiresAt', type: 'date', required: true },
  ],
};
