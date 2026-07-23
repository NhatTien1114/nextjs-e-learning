import Heading from '@/components/typography/Heading'
import { getAllCourse } from '@/lib/action/course.action'
import React from 'react'
import CourseGrid from './CourseGrid';
import { ICourse } from '@/database/course.model';
import CourseItems from '@/components/course/CourseItems';

const page = async () => {
    const courses = await getAllCourse({});
    return (
        <>
            <Heading>Khám phá</Heading>
            <CourseGrid>
                {courses && courses.length > 0 && courses.map((item: ICourse) => (
                    <CourseItems key={item.slug} data={item}></CourseItems>
                ))}
            </CourseGrid>
        </>
    )
}

export default page