"use client";
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import IconDelete from '../icons/IconDelete'
import IconEdit from '../icons/IconEdit'
import { commonClassNames } from '@/constants'
import { Button } from '../ui/button'
import { createLectures } from '@/lib/action/leture.action';
import { toast } from 'react-toastify';

const CourseContent = ({ course }: { course: any }) => {
    const lectures = course.lectures;

    const handleCreateLecture = async () => {
        try {
            const res = await createLectures({
                title: "Chương mới",
                order: lectures.length + 1,
                course: course._id,
                path: `/manage/course/content?slug=${course.slug}`
            })
            if (res?.success) {
                toast.success("Tạo bài học thành công")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {lectures.map((lecture: any) => {
                return (
                    <Accordion key={lecture._id} className="w-full p-4" type="single" collapsible defaultValue={`item-${lecture._id}`}>
                        <AccordionItem value={`item-${lecture._id}`}>
                            <AccordionTrigger>
                                <div className="flex items-center justify-between gap-3 w-full pr-5">
                                    <div>Chương 1: Giới thiệu khóa học</div>
                                    <div className="flex gap-2">
                                        <span className={commonClassNames.action}><IconEdit></IconEdit></span>
                                        <span className={commonClassNames.action}><IconDelete></IconDelete></span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex items-center justify-between gap-3 w-full pr-5">
                                    Bài 1: Chuẩn bị công cụ
                                    <div className="flex gap-2">
                                        <span className={commonClassNames.action}><IconEdit></IconEdit></span>
                                        <span className={commonClassNames.action}><IconDelete></IconDelete></span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )
            })}

            {lectures.length <= 0 && <Button className='m-5' onClick={handleCreateLecture}>Thêm chương mới</Button>}
        </>
    )
}

export default CourseContent