import { Button } from '@/components/ui/button'
import React from 'react'

const loading = () => {
    return (
        <>
            <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen p-5">
                <div>
                    <div className="aspect-video rounded-lg mb-5 skeleton"></div>
                    <div className="flex items-center justify-end mb-5">
                        <div className="flex gap-3">
                            <Button
                                className="size-10 p-3 skeleton"

                            >
                            </Button>
                            <Button
                                className="size-10 p-3 skeleton"

                            >
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-lg p-4 ml-5 skeleton"></div>

                </div>
                <div>
                    <div className="h-3 rounded-lg w-full skeleton mb-3"></div>
                    <div className="flex flex-col gap-5">
                        <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                        <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                        <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default loading
