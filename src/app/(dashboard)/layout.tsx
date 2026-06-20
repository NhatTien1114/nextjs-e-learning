import Sidebar from '@/components/layouts/Sidebar'
import React from 'react'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from '../api/uploadthing/core';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <div className="wrapper grid lg:grid-cols-[300px_minmax(0,1fr)] h-screen">
                <div className="sticky top-0">
                    <Sidebar />
                </div>
                <main className="bg-gray-200 dark:bg-grayDarkest">{children}</main>
            </div>
        </div>
    )
}

export default layout
