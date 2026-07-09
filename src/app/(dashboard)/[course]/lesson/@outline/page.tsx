import PageNotFound from '@/app/not-found';
import LessonContent from '@/components/lesson/LessonContent'
import { getCourseBySlug } from '@/lib/action/course.action';
import { getHistory } from '@/lib/action/history.action';
import { countCourseLesson } from '@/lib/action/lesson.action';
import { cn } from '@/lib/utils';
import React from 'react'

const Outline = async ({ params, searchParams }: {
    params: Promise<{ course: string }>,
    searchParams: Promise<{ slug: string }>
}) => {
    const course = (await params).course;
    const slug = (await searchParams).slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse) return <PageNotFound />
    const lectures = JSON.parse(JSON.stringify(findCourse.lectures || []));

    const histories = await getHistory({ course: findCourse._id.toString() });
    const safeHistories = histories ? JSON.parse(JSON.stringify(histories)) : [];
    const lessonList = await countCourseLesson({
        course: findCourse._id.toString() || ""
    });
    if (!lessonList) return null;
    const percentCompleted = safeHistories.length ? (safeHistories.length.toString() / lessonList) * 100 : 0;
    return (
        <div>
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

export default Outline
