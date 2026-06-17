"use server";

import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import { TCourseParams } from "@/types";
import { Types } from "mongoose";

export async function getCourseBySlug({ slug }: { slug: string }) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug });
        return findCourse;
    } catch (error) {
        console.log(error);
    }
}

export async function createCourse(params: TCourseParams) {
    try {
        await connectToDatabase();
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