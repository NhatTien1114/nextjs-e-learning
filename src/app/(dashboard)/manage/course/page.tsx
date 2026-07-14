
import CourseManage from '@/components/course/CourseManage'
import { getAllCourse } from '@/lib/action/course.action'
import React from 'react'

const page = async ({ searchParams }: {
    searchParams: Promise<{
        page?: string;
        search?: string,
        status?: string;
    }>
}) => {
    const courses = await getAllCourse(
        {
            page: (await searchParams).page ? parseInt((await searchParams).page as string) : 1,
            limit: 2,
            search: (await searchParams).search,
            status: (await searchParams).status
        }
    );
    return (
        <>
            <div className="m-5">
                <CourseManage
                    courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
                ></CourseManage>
            </div>


        </>
    )
}

export default page
