import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
var handler = function (req) {
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req: req,
        router: appRouter,
        // @ts-expect-error context already passed from express middleware
        createContext: function () { return ({}); },
    });
};
export { handler as GET, handler as POST };
