import React from 'react'
import IconPlay from '../icons/IconPlay'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LessonItem = ({ lesson, url, isActive }: { lesson: { title: string, duration: number }, url?: string, isActive?: boolean }) => {
    return (
        <div className={cn(
            "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm mb-5",
            isActive ? "text-primary font-semibold pointer-events-none" : "")}>
            <IconPlay />
            {url ? <Link href={url}>{lesson.title}</Link> : <h4>{lesson.title}</h4>}
            <span className="ml-auto text-xs text-grayDark">{lesson.duration} phút</span>
        </div>
    )
}

export default LessonItem
