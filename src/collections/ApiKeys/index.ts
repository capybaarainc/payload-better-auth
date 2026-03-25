import type { CollectionConfig } from 'payload';

export const ApiKeys: CollectionConfig = {
  slug: 'apiKeys',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'key', type: 'text', required: true },
    { name: 'userId', type: 'text', required: true, index: true },
    { name: 'expiresAt', type: 'date' },
    { name: 'createdAt', type: 'date' },
    { name: 'updatedAt', type: 'date' },
  ],
};