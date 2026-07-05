"use client"
import React from 'react'
import IconPlay from '../icons/IconPlay'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
import { createHistory } from '@/lib/action/history.action'

const LessonItem = ({ lesson, url, isActive = false, isCheck = false }: { lesson: { title: string, duration?: number, course?: string, _id: string, slug?: string }, url?: string, isActive?: boolean, isCheck?: boolean }) => {

    const handleChecked = async (checked: boolean | string) => {
        try {
            await createHistory({
                lesson: lesson._id,
                course: lesson.course || "",
                checked,
                path: url || "/"
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={cn(
            "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm mb-5",
            isActive ? "text-primary font-semibold " : "")}>
            {url && <Checkbox
                defaultChecked={isCheck ? true : false}
                onCheckedChange={(checked) => handleChecked(checked)} />}
            <IconPlay />
            <div className="flex-1 min-w-0">
                {url ? (
                    <Link href={url} className={cn("block truncate", isActive ? "pointer-events-none" : "")} title={lesson.title}>
                        {lesson.title}
                    </Link>
                ) : (
                    <h4 className="block truncate" title={lesson.title}>{lesson.title}</h4>
                )}
            </div>
            <span className="ml-auto text-xs text-grayDark">{lesson.duration} phút</span>
        </div>
    )
}

export default LessonItem
