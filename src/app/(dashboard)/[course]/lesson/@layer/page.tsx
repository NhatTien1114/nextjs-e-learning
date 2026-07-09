import React from 'react'
import LessonSaveUrl from '../LessonSaveUrl'
import LessonNavigation from '../LessonNavigation'
import PageNotFound from '@/app/not-found'
import { getCourseBySlug } from '@/lib/action/course.action'
import { findAllLesson, getLessonBySlug } from '@/lib/action/lesson.action'
import Heading from '@/components/typography/Heading'
import { Button } from '@/components/ui/button'
import VideoPlayer from './VideoPlayer'

const Layer = async ({ params, searchParams }: {
    params: Promise<{ course: string }>,
    searchParams: Promise<{ slug: string }>
}) => {
    const course = (await params).course;
    const slug = (await searchParams).slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse) return <PageNotFound />
    const lesson = await getLessonBySlug({
        slug,
        course: findCourse._id.toString() || ""
    });
    if (!lesson) return <PageNotFound />;
    const split = lesson?.video_url?.split("be/")[1];

    const lessonList = await findAllLesson({
        course: findCourse._id.toString() || ""
    });
    if (!lessonList) return null;
    const currentLessonIndex = lessonList?.findIndex((el) => el.slug === lesson.slug);
    const nextLesson = lessonList?.[currentLessonIndex + 1];
    const prevLesson = lessonList?.[currentLessonIndex - 1];


    return (
        <div>
            <LessonSaveUrl
                course={course}
                url={`/${course}/lesson?slug=${slug}`}
            ></LessonSaveUrl>
            <div>
                <VideoPlayer
                    nextLesson={
                        !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
                    }
                    prevLesson={
                        !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
                    }
                />

                <Heading>{lesson.title}</Heading>
                <div className="bgDarkMode border borderDarkMode rounded-lg p-4 ml-5 entry-content">

                    <div
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                        className="text-sm text-grayDark"></div>
                </div>
            </div>
        </div>
    )
}

export default Layer
