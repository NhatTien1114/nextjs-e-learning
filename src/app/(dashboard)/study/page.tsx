import Heading from '@/components/typography/Heading'
import React from 'react'
import { getUserCourses } from '@/lib/action/user.action'
import CourseStudy from './CourseStudy'

const page = async () => {
    const course = await getUserCourses();
    if (!course) return null;
    return (
        <>
            <Heading>Khu vực học tập</Heading>
            <CourseStudy
                course={course ? JSON.parse(JSON.stringify(course)) : []}
            ></CourseStudy>
        </>
    )
}

export default page
