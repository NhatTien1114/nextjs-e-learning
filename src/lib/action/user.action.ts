"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TUserParams } from "@/types";

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

export {
    createUser
};