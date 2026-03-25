import type { CollectionConfig } from 'payload';

export const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'token', type: 'text', required: true, index: true },
    { name: 'expiresAt', type: 'date', required: true },
    { name: 'ipAddress', type: 'text' },
    { name: 'userAgent', type: 'text' },
    { name: 'userId', type: 'text', required: true, index: true },
    { name: 'activeOrganizationId', type: 'text' },
    { name: 'impersonatedBy', type: 'text' },
  ],
};
