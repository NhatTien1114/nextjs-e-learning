import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import React from 'react'

const page = () => {
    return (
        <>
            <Heading>Khu vực học tập</Heading>
            <CourseGrid>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
            </CourseGrid>
        </>
    )
}

export default page
