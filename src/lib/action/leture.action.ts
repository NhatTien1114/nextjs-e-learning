"use server"
import Course from "@/database/course.model";
import { connectToDatabase } from "../mongoose"
import Lecture from "@/database/lecture.mode";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { revalidatePath } from "next/cache";

import { Types } from "mongoose";

export const createLectures = async (params: TCreateLectureParams) => {
    try {
        await connectToDatabase();
        const findCourse = await Course.findById(params.course);
        if (!findCourse) return null;
        const newLecture = await Lecture.create({
            _id: new Types.ObjectId().toString(),
            ...params
        });
        findCourse.lectures.push(newLecture._id);
        await findCourse.save();
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: 'Tạo khóa học thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Create lecture failed',
        };
    }
}

export const updateLectures = async (params: TUpdateLectureParams) => {
    try {
        await connectToDatabase();
        await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
            new: true
        });
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: 'Cập nhật bài học thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Update lecture failed',
        };
    }
}