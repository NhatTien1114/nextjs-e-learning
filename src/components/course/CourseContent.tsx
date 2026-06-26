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
import { TUpdateCourseLecture, TUpdateCourseParams, } from '@/types';
import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { createLessons, updateLessons } from '@/lib/action/lesson.action';
import { ILesson } from '@/database/lesson.model';
import IconCheck from '../icons/IconCheck';
import IconCancel from '../icons/IconCancel';
import LessonItemUpdate from '../lesson/LessonItemUpdate';

const CourseContent = ({ course }: { course: TUpdateCourseParams }) => {
    const lectures = course.lectures;
    const [lectureEditing, setLectureEditing] = useState("");
    const [lectureIdEditing, setLectureIdEditing] = useState("");
    const [lessonEditing, setLessonEditing] = useState("");
    const [lessonIdEditing, setLessonIdEditing] = useState("");

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
                    toast.success("Xóa chương thành công");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Xóa chương thất bại");
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

    const handleCreateLesson = async (courseId: string, lectureId: string) => {
        try {
            const res = await createLessons({
                lecture: lectureId,
                course: courseId,
                title: "Bài học mới",
                path: `/manage/course/content?slug=${course.slug}`
            });
            if (res?.success) {
                toast.success("Thêm bài học thành công")
            }
        } catch (error) {
            console.log(error);
            toast.error("Thêm bài học thất bại")
        }
    }

    const handleUpadteLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
        e.stopPropagation();
        try {
            const res = await updateLessons({
                lessonId,
                updateData: {
                    title: lessonEditing,
                },
                path: `/manage/course/content?slug=${course.slug}`
            })
            if (res?.success) {
                toast.success("Cập nhật bài học thành công")
                setLessonIdEditing("");
                setLessonEditing("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật bài học thất bại")
        }
    }

    const handleDeleteLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
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
                const res = await updateLessons({
                    lessonId,
                    updateData: {
                        _destroy: true,
                    },
                    path: `/manage/course/content?slug=${course.slug}`
                });
                if (res?.success) {
                    toast.success("Xóa bài học thành công")
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Xóa bài học thất bại");
        }
    }
    return (
        <div>
            <div className="flex flex-col gap-5 m-5">
                {lectures?.map((lecture: TUpdateCourseLecture) => (
                    <div key={lecture._id}>
                        <Accordion
                            type="single"
                            collapsible={!lectureIdEditing}
                            className="w-full"
                        >
                            <AccordionItem value={lecture._id}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 justify-between w-full pr-5">
                                        {lecture._id === lectureIdEditing ? (
                                            <>
                                                <div className="w-full">
                                                    <Input
                                                        placeholder="Tên chương"
                                                        defaultValue={lecture.title}
                                                        onChange={(e) => setLectureEditing(e.target.value)}
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
                                                        <IconCheck />
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
                                                        <IconCancel></IconCancel>
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
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
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="border-none !bg-transparent">
                                    <div className="flex flex-col gap-5">
                                        {lecture.lessons.map((lesson: ILesson) => (
                                            <Accordion
                                                type="single"
                                                collapsible={!lessonEditing}
                                                key={lesson._id}
                                            >
                                                <AccordionItem value={lesson._id}>
                                                    <AccordionTrigger>
                                                        <div className="flex items-center gap-3 justify-between w-full pr-5">
                                                            {lesson._id === lessonIdEditing ? (
                                                                <>
                                                                    <div className="w-full">
                                                                        <Input
                                                                            placeholder="Tên bài học"
                                                                            defaultValue={lesson.title}
                                                                            onChange={(e) =>
                                                                                setLessonEditing(e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <span
                                                                            className={cn(
                                                                                commonClassNames.action,
                                                                                "text-green-500"
                                                                            )}
                                                                            onClick={(e) =>
                                                                                handleUpadteLesson(e, lesson._id)
                                                                            }
                                                                        >
                                                                            <IconCheck />
                                                                        </span>
                                                                        <span
                                                                            className={cn(
                                                                                commonClassNames.action,
                                                                                "text-red-500"
                                                                            )}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setLessonIdEditing("");
                                                                            }}
                                                                        >
                                                                            <IconCancel></IconCancel>
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div>{lesson.title}</div>
                                                                    <div className="flex gap-2">
                                                                        <span
                                                                            className={cn(
                                                                                commonClassNames.action,
                                                                                "text-blue-500"
                                                                            )}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setLessonIdEditing(lesson._id);
                                                                            }}
                                                                        >
                                                                            <IconEdit />
                                                                        </span>
                                                                        <span
                                                                            className={cn(
                                                                                commonClassNames.action,
                                                                                "text-red-500"
                                                                            )}
                                                                            onClick={(e) => handleDeleteLesson(e, lesson._id)}
                                                                        >
                                                                            <IconDelete />
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <LessonItemUpdate
                                                            lesson={lesson}
                                                        ></LessonItemUpdate>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Button
                            onClick={() => handleCreateLesson(course._id, lecture._id)}
                            className="mt-5 ml-auto w-fit block"
                        >
                            Thêm bài học
                        </Button>
                    </div>
                ))}
            </div>
            <Button onClick={handleCreateLecture} className="m-5">
                Thêm chương mới
            </Button>
        </div>
    );
};

export default CourseContent