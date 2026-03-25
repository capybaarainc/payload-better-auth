import type { CollectionConfig } from 'payload';

export const Invitations: CollectionConfig = {
  slug: 'invitations',
  admin: {
    hidden: true,
  },
  fields: [
    { name: 'organizationId', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'status', type: 'text', required: true },
    { name: 'expiresAt', type: 'date', required: true },
    { name: 'inviterId', type: 'text', required: true },
  ],
};
