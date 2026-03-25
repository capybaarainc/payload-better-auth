// @ts-nocheck
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const syncMembershipsToUserAfterChange: CollectionAfterChangeHook = async ({ req, doc }) => {
  if (!doc?.userId) return doc;

  // Find all memberships for this user
  const allMemberships = await req.payload.find({
    collection: 'members',
    where: {
      userId: {
        equals: doc.userId,
      },
    },
    depth: 0,
    limit: 100,
  });

  const tenants = allMemberships.docs.map((member) => ({
    tenant: member.organizationId,
    role: member.role || 'member',
  }));

  await req.payload.update({
    collection: 'users',
    id: doc.userId,
    data: {
      tenants,
    },
  });

  return doc;
};

export const syncMembershipsToUserAfterDelete: CollectionAfterDeleteHook = async ({ req, doc }) => {
  if (!doc?.userId) return doc;

  const allMemberships = await req.payload.find({
    collection: 'members',
    where: {
      userId: {
        equals: doc.userId,
      },
    },
    depth: 0,
    limit: 100,
  });

  const tenants = allMemberships.docs.map((member) => ({
    tenant: member.organizationId,
    role: member.role || 'member',
  }));

  await req.payload.update({
    collection: 'users',
    id: doc.userId,
    data: {
      tenants,
    },
  });

  return doc;
};
