import { TUpdateCourseLecture } from '@/types'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import LessonItem from './LessonItem'
import { IHistory } from '@/database/history.model'

const LessonContent = ({ lectures, course, slug, histories }: { lectures: TUpdateCourseLecture[], course: string, slug: string, histories: IHistory[] }) => {

    return (
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
                                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : []}
                                    isActive={!slug ? false : lesson.slug === slug}
                                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                                    isCheck={histories.some((history) => history.lesson.toString() === lesson._id.toString())}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    )
}

export default LessonContent
