import { Button } from '@/components/ui/button'
import React from 'react'

const LoadingLayer = () => {
    return (
        <>
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
        </>
    )
}

export default LoadingLayer
