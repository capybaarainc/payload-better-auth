import type { CollectionConfig } from 'payload';

export const TwoFactors: CollectionConfig = {
  slug: 'two-factors',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'secret', type: 'text', required: true },
    { name: 'backupCodes', type: 'text', required: true },
    { name: 'userId', type: 'text', required: true, index: true },
  ],
};
