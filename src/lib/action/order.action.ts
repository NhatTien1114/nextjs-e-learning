/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Order, { IOrder } from "@/database/order.model";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/types";
import { QueryFilter } from "mongoose";
import Course from "@/database/course.model";
import User from "@/database/user.model";
import { EOrderStatus } from "@/types/enum";
import { revalidatePath } from "next/cache";

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
            coupon: params.coupon || undefined,
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

export async function updateOrderStatus({ orderId, status }: { orderId: string, status: EOrderStatus }) {
    try {
        await connectToDatabase();
        const findOrder = await Order.findById(orderId).populate({
            path: "course",
            select: "_id",
            model: Course
        }).populate({
            path: "user",
            select: "_id",
            model: User
        });
        if (!findOrder) return;
        if (findOrder.status === EOrderStatus.REJECT && status === EOrderStatus.REJECT) return;
        const findUser = await User.findById(findOrder.user._id);

        await Order.findByIdAndUpdate(orderId, { status });

        if (status === EOrderStatus.ACCEPTED && findOrder.status === EOrderStatus.PENDING) {
            findUser.courses.push(findOrder.course._id);
            await findUser.save();
        }

        if (status === EOrderStatus.REJECT && findOrder.status === EOrderStatus.ACCEPTED) {
            findUser.courses = findUser.courses.filter((el: any) => el.toString() !== findOrder.course._id.toString());
            await findUser.save();
        }
        revalidatePath("/manage/order");
        return {
            success: true
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getOrderDetail({ code }: { code: string }) {
    try {
        await connectToDatabase();
        const orderDetail = await Order.findOne({ code }).populate({
            path: "course",
            model: Course,
            select: "title",
        });
        return JSON.parse(JSON.stringify(orderDetail));
    } catch (error) {
        console.log(error)
    }
}