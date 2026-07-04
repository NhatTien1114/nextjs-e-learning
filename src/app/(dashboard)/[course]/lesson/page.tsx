import PageNotFound from '@/app/not-found';
import { getCourseBySlug } from '@/lib/action/course.action';
import { findAllLesson, getLessonBySlug } from '@/lib/action/lesson.action';
import React from 'react'
import LessonNavigation from './LessonNavigation';
import Heading from '@/components/typography/Heading';
import LessonContent from '@/components/lesson/LessonContent';
import { getHistory } from '@/lib/action/history.action';
import { cn } from '@/lib/utils';

const page = async ({ params, searchParams }: {
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

    const lectures = JSON.parse(JSON.stringify(findCourse.lectures || []));

    const histories = await getHistory({ course: findCourse._id.toString() });
    const safeHistories = histories ? JSON.parse(JSON.stringify(histories)) : [];
    const percentCompleted = safeHistories.length ? (safeHistories.length.toString() / lessonList.length) * 100 : 0;
    return (
        <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen p-5">
            <div>
                <div className="relative mb-5 aspect-video">
                    <iframe width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${split}`}
                        className="h-full w-full object-fill rounded-lg"
                    ></iframe>
                </div>
                <div className="flex items-center justify-end">
                    <LessonNavigation
                        nextLesson={
                            !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
                        }
                        prevLesson={
                            !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
                        }
                    />
                </div>
                <Heading>{lesson.title}</Heading>
                <div className="bgDarkMode border borderDarkMode rounded-lg p-4 ml-5 entry-content">

                    <div
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                        className="text-sm text-grayDark"></div>
                </div>
            </div>
            <div>
                <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
                    <div className="h-3 rounded-lg w-full bgDarkMode border borderDarkMode mb-3">
                        <div
                            className={cn(
                                "h-full rounded-lg bg-primary transition-all duration-300 ease-in-out",
                                percentCompleted === 100 ? "bg-green-500" : ""
                            )}
                            style={{
                                width: `${percentCompleted}%`,
                            }}
                        ></div>
                    </div>
                    <LessonContent
                        lectures={lectures}
                        course={course}
                        slug={slug}
                        histories={safeHistories}
                    ></LessonContent>
                </div>
            </div>
        </div>
    )
}

export default page
