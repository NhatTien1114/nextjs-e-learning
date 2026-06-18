import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import { getAllCourse } from '@/lib/action/course.action'
import { ICourse } from '@/database/course.model'
import React from 'react'

const page = async () => {
    const course = await getAllCourse();
    return (
        <>
            <Heading>Khu vực học tập</Heading>
            <CourseGrid>
                {course && course.length > 0 && course?.map((item: ICourse) => (
                    <CourseItems key={item.slug} data={item}></CourseItems>
                ))}
            </CourseGrid>
        </>
    )
}

export default page
