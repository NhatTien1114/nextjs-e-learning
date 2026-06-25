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
import { createLectures, updateLectures } from '@/lib/action/leture.action';
import { toast } from 'react-toastify';
import { MouseEvent } from "react";
import Swal from 'sweetalert2';
import { ILecture } from '@/database/lecture.mode';
import { TUpdateCourseParams, } from '@/types';
import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

const CourseContent = ({ course }: { course: TUpdateCourseParams }) => {
    const lectures = course.lectures;
    const [lectureEditing, setLectureEditing] = useState("");
    const [lectureIdEditing, setLectureIdEditing] = useState("");

    const handleCreateLecture = async () => {
        try {
            const res = await createLectures({
                title: "Chương mới",
                order: (lectures?.length ?? 0) + 1,
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

    const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        try {
            const result = await Swal.fire({
                title: "Bạn có chắc chắn xóa?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý"
            });
            if (result.isConfirmed) {
                const res = await updateLectures({
                    lectureId,
                    updateData: {
                        _destroy: true,
                    },
                    path: `/manage/course/content?slug=${course.slug}`
                });
                if (res?.success) {
                    toast.success("Xóa bài học thành công");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Xóa bài học thất bại");
        }
    }

    const handleEditLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        try {
            const res = await updateLectures({
                lectureId,
                updateData: {
                    title: lectureEditing,
                },
                path: `/manage/course/content?slug=${course.slug}`
            })
            if (res?.success) {
                toast.success("Cập nhật bài học thành công")
                setLectureIdEditing("");
                setLectureEditing("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật bài học thất bại")
        }
    }
    return (
        <>
            {lectures?.map((lecture: ILecture) => {
                return (
                    <Accordion key={lecture._id} className="w-full p-4" type="single" collapsible={!lectureIdEditing} defaultValue={`item-${lecture._id}`}>
                        <AccordionItem value={`item-${lecture._id}`}>
                            <AccordionTrigger>
                                <div className="flex items-center justify-between gap-3 w-full pr-5">
                                    {lecture._id === lectureIdEditing ? (
                                        <>
                                            <div className="w-full">
                                                <Input
                                                    value={lectureEditing}
                                                    onChange={(e) => setLectureEditing(e.target.value)}
                                                    defaultValue={lecture.title}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <span
                                                    className={cn(
                                                        commonClassNames.action,
                                                        "text-green-500"
                                                    )}
                                                    onClick={(e) => handleEditLecture(e, lecture._id)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </span>
                                                <span
                                                    className={cn(
                                                        commonClassNames.action,
                                                        "text-red-500"
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLectureIdEditing("");
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </>
                                    ) :
                                        <>
                                            <div>{lecture.title}</div>
                                            <div className="flex gap-2">
                                                <span
                                                    className={cn(
                                                        commonClassNames.action,
                                                        "text-blue-500"
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLectureIdEditing(lecture._id);
                                                    }}
                                                >
                                                    <IconEdit />
                                                </span>
                                                <span
                                                    className={cn(
                                                        commonClassNames.action,
                                                        "text-red-500"
                                                    )}
                                                    onClick={(e) => handleDeleteLecture(e, lecture._id)}
                                                >
                                                    <IconDelete />
                                                </span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex items-center justify-between gap-3 w-full pr-5">
                                    Bài 1: Chuẩn bị công cụ
                                    <div className="flex gap-2">
                                        <span className={commonClassNames.action}><IconEdit></IconEdit></span>
                                        <span
                                            onClick={(e) => handleDeleteLecture(e, lecture._id)}
                                            className={commonClassNames.action}><IconDelete></IconDelete></span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )
            })}

            <Button className='m-5 mt-3 text-white' onClick={handleCreateLecture}>Thêm chương mới</Button>
        </>
    )
}

export default CourseContent