import PageNotFound from '@/app/not-found';
import { getCourseBySlug } from '@/lib/action/course.action';
import { findAllLesson, getLessonBySlug } from '@/lib/action/lesson.action';
import React from 'react'
import LessonNavigation from './LessonNavigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TUpdateCourseLecture } from '@/types';
import LessonItem from '@/components/lesson/LessonItem';

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

    const lectures = findCourse.lectures || [];
    return (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen p-5">
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
                    <div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-5">
                    {lectures.map((lecture: TUpdateCourseLecture) => (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            key={lecture._id}
                        >
                            <AccordionItem value={lecture._id}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 justify-between w-full pr-5">
                                        <div>{lecture.title}</div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="!bg-transparent border-none">
                                    {lecture.lessons.map((lesson) => (
                                        <LessonItem
                                            key={lesson._id}
                                            lesson={lesson}
                                        />
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
