import { CourseGrid } from '@/common'
import React from 'react'

const CourseSkeleton = () => {
    return (
        <div className="bg-white dark:bg-grayDarker dark:border-grayDark/50 border border-gray-200 p-4 rounded-2xl flex flex-col">
            {/* Image */}
            <div className="block h-[180px] w-full rounded-lg skeleton"></div>

            <div className="pt-4 flex flex-col flex-1">
                {/* Title */}
                <div className="h-6 w-3/4 skeleton rounded-md mb-3"></div>

                <div className="flex items-center gap-3 mb-5 mt-auto">
                    {/* Info (3 cái) */}
                    <div className="h-4 w-12 skeleton rounded-md"></div>
                    <div className="h-4 w-12 skeleton rounded-md"></div>
                    <div className="h-4 w-12 skeleton rounded-md"></div>

                    {/* Giá */}
                    <div className="h-5 w-20 skeleton ml-auto rounded-md"></div>
                </div>

                {/* Nút */}
                <div className="flex items-center justify-center w-full mt-auto rounded-lg h-12 skeleton"></div>
            </div>
        </div>
    )
}

const Loading = () => {
    return (
        <div>
            <div className="h-10 w-48 skeleton rounded-lg m-5"></div>
            <CourseGrid>
                {Array.from({ length: 3 }).map((_, index) => (
                    <CourseSkeleton key={index} />
                ))}
            </CourseGrid>
        </div>
    )
}

export default Loading