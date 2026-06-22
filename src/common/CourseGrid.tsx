import React from 'react'

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" grid gap-4 lg:p-3 grid-cols-1 lg:grid-cols-3 lg:gap-8  mt-6 course-slider">
            {children}
        </div>
    )
}

export default CourseGrid
