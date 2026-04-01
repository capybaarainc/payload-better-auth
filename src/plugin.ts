import type { Config, Plugin } from 'payload'

import { Accounts } from './collections/Accounts'
import { ApiKeys } from './collections/ApiKeys'
import { Invitations } from './collections/Invitations'
import { Members } from './collections/Members'
import { Organizations } from './collections/Organizations'
import { Passkeys } from './collections/Passkeys'
import { Sessions } from './collections/Sessions'
import { TwoFactors } from './collections/TwoFactors'
import { Verifications } from './collections/Verifications'
import { createSyncBetterAuth } from './hooks/syncBetterAuth'

interface BetterAuthPluginOptions {
  auth?: any // The better-auth instance
}

export const betterAuthPlugin = (options?: BetterAuthPluginOptions): Plugin => {
  return (config: Config): Config => {
    // Inject better-auth collections
    const collections = config.collections || []

    // Optional: if options.auth is provided, we could inject the strategy automatically into the users collection
    if (options?.auth) {
      const usersCollection = collections.find(
        (c) => c.slug === 'users' || c.slug === config.admin?.user,
      )
      if (usersCollection) {
        usersCollection.auth = {
          ...((typeof usersCollection.auth === 'object' && usersCollection.auth) || {}),
          strategies: [
            ...((typeof usersCollection.auth === 'object' && usersCollection.auth?.strategies) ||
              []),
            {
              name: 'better-auth',
              authenticate: async ({ headers, payload }) => {
                try {
                  const res = await options.auth.api.getSession({ headers })
                  if (!res || !res.session || !res.user) {
                    return { user: null }
                  }
                  const fullUser = await payload.findByID({
                    id: res.user.id,
                    collection: usersCollection.slug as any,
                  })
                  if (!fullUser) {
                    return { user: null }
                  }
                  return {
                    user: {
                      ...fullUser,
                      id: res.user.id,
                      _strategy: 'better-auth',
                      collection: usersCollection.slug,
                    } as any,
                  }
                } catch (error) {
                  return { user: null }
                }
              },
            },
          ],
        }

        // Inject the syncBetterAuth hook
        usersCollection.hooks = {
          ...usersCollection.hooks,
          beforeChange: [
            ...(usersCollection.hooks?.beforeChange || []),
            createSyncBetterAuth(options.auth),
          ],
        }
      }
    }

    return {
      ...config,
      collections: [
        ...collections,
        Accounts,
        Invitations,
        Members,
        Organizations,
        Sessions,
        TwoFactors,
        Verifications,
        Passkeys,
        ApiKeys,
      ],
      custom: {
        ...(config.custom || {}),
        hasBetterAuthPlugin: true,
      },
    }
  }
}
