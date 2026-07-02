import { TUpdateCourseLecture } from '@/types'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import LessonItem from './LessonItem'

const LessonContent = ({ lectures, course, slug }: { lectures: TUpdateCourseLecture[], course: string, slug: string }) => {
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
                                    lesson={lesson}
                                    isActive={!slug ? false : lesson.slug === slug}
                                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
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
