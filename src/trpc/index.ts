import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { authRouter } from './auth-router'

export const appRouter = router({
  auth: authRouter,

  // ... other routers

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator.extend({
          excludeId: z.string().optional(),
        }),
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, excludeId, ...queryOpts } = query

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<string, { equals: string }> = {}
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1

      let sortOption: string = '-createdAt' // Default sort

      switch (sort) {
        case 'recent':
          sortOption = '-createdAt'
          break
        case 'oldest':
          sortOption = 'createdAt'
          break
        case 'alphabetical':
          sortOption = 'name'
          break
        case 'reverse-alphabetical':
          sortOption = '-name'
          break
        case 'random':
          // For random, we'll keep the default sorting (by createdAt)
          sortOption = '-createdAt'
          break
      }

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products', // You might want to rename this to 'poems' or 'literature'
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
          ...(excludeId
            ? {
                id: {
                  not_equals: excludeId,
                },
              }
            : {}),
        },
        sort: sortOption,
        depth: 1,
        limit,
        page,
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),
})

export type AppRouter = typeof appRouter