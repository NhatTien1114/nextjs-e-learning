import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import { ICourse } from '@/database/course.model'
import React from 'react'
import { getUserCourses } from '@/lib/action/user.action'

const page = async () => {
    const course = await getUserCourses();
    if (!course) return null;
    return (
        <>
            <Heading>Khu vực học tập</Heading>
            <CourseGrid>
                {course && course.length > 0 && course?.map((item: ICourse) => (
                    <CourseItems
                        key={item.slug}
                        data={item}
                        cta={"Tiếp tục học"}
                        url="/"
                    >
                    </CourseItems>
                ))}
            </CourseGrid>
        </>
    )
}

export default page
