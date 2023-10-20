'use client'

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({children}:PropsWithChildren) => {

    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                
            }
        }
    }));

    const [trpcClient] = React.useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url:'https://kite-theta.vercel.app/api/trpc'
            })
        ]
    }))

    return <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
    
}

export default Providers;