import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
 
export const appRouter = router({

  authCallback: publicProcedure.query(async () => {
    
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const dbUser = await db.user.findFirst({
      where: {
        id:user.id
      }
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email as string,
        }
      })
    }

    return { success: true };

  }),

  getUserFiles: privateProcedure.query(async (ctx) => {
    let userId = ctx.ctx.userId;

    return await db.file.findMany({
      where: {
        userId,
      },
    })
  })
});
 

export type AppRouter = typeof appRouter;