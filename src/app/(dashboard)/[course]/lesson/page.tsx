import PageNotFound from '@/app/not-found';
import IconLeftArrow from '@/components/icons/IconLeftArrow';
import IconRightArrow from '@/components/icons/IconRightArrow';
import { Button } from '@/components/ui/button';
import { getCourseBySlug } from '@/lib/action/course.action';
import { getLessonBySlug } from '@/lib/action/lesson.action';
import React from 'react'

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
                    <div className="flex gap-3">
                        <Button className="size-10 p-3">
                            <IconLeftArrow />
                        </Button>
                        <Button className="size-10 p-3">
                            <IconRightArrow />
                        </Button>
                    </div>
                    <div></div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default page
