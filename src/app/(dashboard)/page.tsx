import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import { ICourse } from '@/database/course.model'
import { getAllCoursePublic } from '@/lib/action/course.action'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const course = await getAllCoursePublic({});
    return (
        <>
            <Heading>Welcom to Ucademy</Heading>
            <div className='flex justify-end items-center'>
                <Link className='mr-5 text-sm underline underline-offset-2 hover:text-primary' href="/explore">Khám phá thêm</Link>
            </div>
            <CourseGrid>
                {course && course.length > 0 && course?.slice(0, 4).map((item: ICourse) => (
                    <CourseItems key={item.slug} data={item}></CourseItems>
                ))}
            </CourseGrid>
        </>
    )
}

export default page
