import React from 'react'
import IconPlay from '../icons/IconPlay'
import Link from 'next/link'

const LessonItem = ({ lesson, url }: { lesson: { title: string, duration: number }, url?: string }) => {
    return (
        <div className="flex items-center gap-2 bgDarkMode rounded-lg p-4 text-base font-medium mb-5">
            <IconPlay />
            {url ? <Link href={"/"}>{lesson.title}</Link> : <h4>{lesson.title}</h4>}
            <span className="ml-auto text-xs text-grayDark">{lesson.duration} phút hai</span>
        </div>
    )
}

export default LessonItem
