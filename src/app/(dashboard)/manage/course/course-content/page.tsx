import PageNotFound from '@/app/not-found';
import CourseContent from '@/components/course/CourseContent';
import Heading from '@/components/typography/Heading'
import { getCourseBySlug } from '@/lib/action/course.action';
import React from 'react'

const page = async ({
    searchParams
}: {
    searchParams: Promise<{
        slug: string
    }>
}
) => {
    const sp = await searchParams;
    const findCourse = await getCourseBySlug({ slug: sp.slug });
    if (!findCourse) return <PageNotFound></PageNotFound>
    return (
        <>
            <Heading>Nội dung: <strong className="text-primary">{findCourse.title}</strong></Heading>
            <CourseContent
                course={JSON.parse(JSON.stringify(findCourse))}
            ></CourseContent>
        </>
    )
}

export default page