import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import { createUser } from '@/lib/action/user.action'
import React from 'react'

const page = () => {
    return (
        <>
            <Heading>Khám phá</Heading>
            <CourseGrid>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
            </CourseGrid>
        </>
    )
}

export default page
