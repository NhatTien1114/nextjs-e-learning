/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import { ICourse } from '@/database/course.model'
import React, { useEffect, useState } from 'react'

const CourseStudy = ({ course }: { course: ICourse[] | null | undefined }) => {
    const [lastLesson, setLastLesson] = useState<any[]>([]);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lastLesson') : null;
        setLastLesson(stored ? JSON.parse(stored) : []);
    }, []);

    if (!course || course.length <= 0) return null;

    return (
        <CourseGrid>
            {course.map((item: ICourse) => {
                const url = lastLesson.find((el: any) => el.course === item.slug)?.lesson || '';
                return (
                    <CourseItems
                        key={item.slug}
                        data={item}
                        cta="Tiếp tục học"
                        url={url}
                    />
                )
            })}
        </CourseGrid>
    )
}

export default CourseStudy
