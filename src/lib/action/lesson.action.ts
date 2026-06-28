"use server";

import { connectToDatabase } from "../mongoose";
import Lesson, { ILesson } from "@/database/lesson.model";
import Lecture from "@/database/lecture.mode";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import Course from "@/database/course.model";
import { getCourseBySlug } from "./course.action";

export const createLessons = async (params: TCreateLessonParams) => {
    try {
        await connectToDatabase();
        const finCourse = await Course.findById(params.course);
        if (!finCourse) return null;
        const findLecture = await Lecture.findById(params.lecture);
        if (!findLecture) return null;
        const newId = new Types.ObjectId().toString();
        const newLesson = await Lesson.create({
            _id: newId,
            title: params.title,
            slug: `bai-hoc-${newId}`,
            course: params.course,
            lectures: [params.lecture]
        });
        findLecture.lessons.push(newLesson._id);
        await findLecture.save();
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: 'Tạo bài học thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Create lesson failed',
        };
    }
}

export const updateLessons = async (params: TUpdateLessonParams) => {
    try {
        await connectToDatabase();
        const res = await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, {
            new: true,
        });
        if (!res) return null;
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: 'Cập nhật bài học thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Cập nhật bài học thất bại',
        };
    }
}

export const getLessonBySlug = async ({ slug, course }: { slug: string, course: string }): Promise<ILesson | undefined> => {
    try {
        await connectToDatabase();
        const findLesson = await Lesson.findOne({
            slug,
            course
        })
        return findLesson;
    } catch (error) {
        console.log(error);

    }

}