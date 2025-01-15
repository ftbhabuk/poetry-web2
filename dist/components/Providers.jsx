'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState } from 'react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '@/trpc/client';
var Providers = function (_a) {
    var children = _a.children;
    var queryClient = useState(function () { return new QueryClient(); })[0];
    var trpcClient = useState(function () {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/api/trpc"),
                    fetch: function (url, options) {
                        return fetch(url, __assign(__assign({}, options), { credentials: 'include' }));
                    },
                }),
            ],
        });
    })[0];
    return (<trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>);
};
export default Providers;
