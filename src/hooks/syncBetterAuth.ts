import type { CollectionBeforeChangeHook } from 'payload';

export const createSyncBetterAuth = (auth: any): CollectionBeforeChangeHook => async ({ data, req, operation }) => {
  if (operation === 'create' && !data.betterAuthId) {
    try {
      const email = data.email as string;
      const name = (data.name as string) || (data.username as string) || email;
      const password = data.password as string;
      const role = (data.role as string) || 'user';

      if (email && password) {
        const headers = new Headers();
        
        const response = await auth.api.signUpEmail({
          body: {
            email,
            password,
            name,
          },
          headers,
        });

        if (response?.user) {
          data.betterAuthId = response.user.id;
          
          if (role) {
            await auth.api.setRole({
              body: {
                userId: response.user.id,
                role: role as 'admin' | 'user',
              },
              headers,
            });
          }
        }
      }
    } catch (error) {
      req.payload.logger.error('Failed to sync user to better-auth', error);
    }
  }

  return data;
};
