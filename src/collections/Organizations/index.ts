import type { CollectionConfig } from 'payload';

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'logo', type: 'text' },
    { name: 'metadata', type: 'text' },
  ],
};
