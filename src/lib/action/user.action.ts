"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TUserParams } from "@/types";
import { ICourse } from "@/database/course.model";
import { auth } from "@clerk/nextjs/server";

const createUser = async (params: TUserParams) => {
    try {
        await connectToDatabase();
        const user = await User.create(params);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserInfo = async ({ userId }: { userId: string }) => {
    try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: userId });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserCourses = async (): Promise<ICourse[] | null | undefined> => {
    try {
        await connectToDatabase();
        const { userId } = await auth();
        if (!userId) return [];
        const findUser = await User.findOne({ clerkId: userId }).populate("courses");
        if (!findUser) return null;
        const courses = findUser.courses || [];
        return courses;
    } catch (error) {
        console.log(error);
    }
}

export {
    createUser,
    getUserInfo, getUserCourses
};