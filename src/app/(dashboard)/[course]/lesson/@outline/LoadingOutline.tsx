import React from 'react'

const LoadingOutline = () => {
    return (
        <>
            <div>
                <div className="h-3 rounded-lg w-full skeleton mb-3"></div>
                <div className="flex flex-col gap-5">
                    <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                    <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                    <div className="h-12 p-4 rounded-lg w-full skeleton"></div>
                </div>
            </div>
        </>
    )
}

export default LoadingOutline
