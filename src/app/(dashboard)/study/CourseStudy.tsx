/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import { ICourse } from '@/database/course.model'
import React from 'react'

const CourseStudy = ({ course }: { course: ICourse[] | null | undefined }) => {
    if (!course || course.length <= 0) return null;
    const lastLesson = JSON.parse(localStorage?.getItem("lastLesson") ?? "[]") || [];
    return (
        <CourseGrid>
            {course && course.length > 0 && course?.map((item: ICourse) => {
                const url = lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
                return (
                    <CourseItems
                        key={item.slug}
                        data={item}
                        cta={"Tiếp tục học"}
                        url={url}
                    >
                    </CourseItems>
                )
            })}
        </CourseGrid>
    )
}

export default CourseStudy
