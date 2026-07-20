"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Coupon from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose"
import { TCreateCouponParams, TUpdateCouponParams } from "@/types";
import { ICoupon } from "@/database/coupon.model";
import { revalidatePath } from "next/cache";

export async function createCoupon(params: TCreateCouponParams): Promise<ICoupon | null> {
    try {
        await connectToDatabase();
        const newCoupon = await Coupon.create(params);
        return JSON.parse(JSON.stringify(newCoupon));
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteCoupon(couponCode: string) {
    try {
        await connectToDatabase();
        await Coupon.findOneAndDelete({ code: couponCode }); // code là tên trường của dữ liệu
        revalidatePath("/manage/coupon")
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function updateCoupon(params: TUpdateCouponParams) {
    try {
        await connectToDatabase();
        const res = await Coupon.findOneAndUpdate({ code: params.code }, params.updateData, { new: true });
        revalidatePath(params.path || "/manage/coupon")
        return {
            success: true,
            message: "Cập nhật thành công",
            data: JSON.parse(JSON.stringify(res))
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error
        };
    }
}

export const getCoupon = async () => {
    try {
        await connectToDatabase();
        const coupons = await Coupon.find();
        return JSON.parse(JSON.stringify(coupons));
    } catch (error) {
        console.log(error);
    }
}

export const getCouponByCode = async (params: any): Promise<ICoupon | any> => {
    try {
        await connectToDatabase();
        const coupon = await Coupon.findOne({ code: params.code }).populate({
            path: "courses",
            select: "_id title"
        });
        return JSON.parse(JSON.stringify(coupon));
    } catch (error) {
        console.log(error);
    }
}
