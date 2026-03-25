import type { CollectionConfig } from 'payload';
import { syncMembershipsToUserAfterChange, syncMembershipsToUserAfterDelete } from './hooks/syncMembershipsToUser';

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    hidden: true,
  },
  hooks: {
    afterChange: [syncMembershipsToUserAfterChange],
    afterDelete: [syncMembershipsToUserAfterDelete],
  },
  fields: [
    { name: 'organizationId', type: 'text', required: true },
    { name: 'userId', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
  ],
};

