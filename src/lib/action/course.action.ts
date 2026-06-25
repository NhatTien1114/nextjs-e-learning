"use server";

import Lecture from "@/database/lecture.mode";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { TCourseParams, TCourseUpdateParams, TUpdateCourseParams } from "@/types";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function getCourseBySlug({ slug }: { slug: string }): Promise<TUpdateCourseParams | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug }).populate({
            path: "lectures",
            model: Lecture,
            select: "_id title",
            match: {
                _destroy: false
            }
        });
        return findCourse;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCourse(): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log(error);
    }
}

export async function createCourse(params: TCourseParams) {
    try {
        await connectToDatabase();
        const exitCourse = await Course.findOne({ slug: params.slug });
        if (exitCourse) {
            return {
                success: false,
                message: "Khóa học đã tồn tại",
            };
        }
        const course = await Course.create({
            _id: new Types.ObjectId().toString(),
            ...params
        });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(course)),
        };
    } catch (error) {
        console.log(error);
    }
}

export const updateCourse = async (params: TCourseUpdateParams) => {
    try {
        await connectToDatabase();
        const findOne = await Course.findOne({ slug: params.slug });
        if (!findOne) return null;
        await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
            new: true
        })
        if (params.path) {
            revalidatePath(params.path);
        }
        revalidatePath("/")
        return {
            success: true,
            message: "Cập nhật thành công"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Cập nhật thất bại"
        }
    }
}
