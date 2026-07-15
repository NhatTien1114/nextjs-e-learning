"use server";

import Order from "@/database/order.model";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/types";
import { QueryFilter } from "mongoose";
import Course from "@/database/course.model";
import User from "@/database/user.model";

export const createOrder = async (params: TCreateOrderParams) => {
    try {
        await connectToDatabase();

        const existingOrder = await Order.findOne({ code: params.code });
        if (existingOrder) {
            return {
                success: false,
                message: "Mã đơn hàng đã tồn tại",
            };
        }

        const newOrder = await Order.create({
            ...params,
            total: params.total ?? 0,
            amount: params.amount ?? 0,
            discount: params.discount ?? 0,
            coupon: params.coupon ?? "",
        });

        return {
            success: true,
            message: "Tạo đơn hàng thành công",
            data: JSON.parse(JSON.stringify(newOrder)),
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Tạo đơn hàng thất bại",
        };
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchOrders(params: any) {
    try {
        connectToDatabase();
        const { page = 1, limit = 10, search, status } = params;
        const skip = (page - 1) * limit;
        const query: QueryFilter<typeof Course> = {};
        if (search) {
            query.$or = [{ code: { $regex: search, $options: "i" } }];
        }
        if (status) {
            query.status = status;
        }
        const orders = await Order.find(query)
            .populate({
                model: Course,
                select: "title",
                path: "course",
            })
            .populate({
                path: "user",
                model: User,
                select: "name",
            })
            .skip(skip)
            .limit(limit);
        return orders;
    } catch (error) { }
}