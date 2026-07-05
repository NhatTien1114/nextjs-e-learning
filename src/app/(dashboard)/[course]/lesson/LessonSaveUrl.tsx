/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from 'react'

const LessonSaveUrl = ({ url, course }: { url: string, course: string }) => {
    useEffect(() => {
        const results: any[] = JSON.parse(localStorage?.getItem("lastLesson") ?? "[]");
        const item = {
            course,
            lesson: url
        }

        if (results.length > 0 && results.some((el) => el.course === course && el.lesson === url)) {
            return;
        }
        results.push(item);
        localStorage?.setItem("lastLesson", JSON.stringify(results));
    }, [course, url])

    return null;
}

export default LessonSaveUrl
