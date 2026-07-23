"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Coupon from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose"
import { TCouponParams, TCreateCouponParams, TUpdateCouponParams } from "@/types";
import { ICoupon } from "@/database/coupon.model";
import { revalidatePath } from "next/cache";

export async function createCoupon(params: TCreateCouponParams): Promise<ICoupon | null> {
    try {
        await connectToDatabase();
        const existCoupon = await Coupon.findOne({ code: params.code });
        if (existCoupon) {
            return null;
        }
        const newCoupon = await Coupon.create(params);
        revalidatePath(params.path || "/manage/coupon")
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
        const res = await Coupon.findOneAndUpdate({ _id: params._id }, params.updateData, { new: true });
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

export const getCouponByCode = async (params: { code: string }): Promise<TCouponParams | any> => {
    try {
        await connectToDatabase();
        const findCoupon = await Coupon.findOne({ code: params.code }).populate({
            path: "courses",
            select: "_id title"
        });
        return JSON.parse(JSON.stringify(findCoupon));
    } catch (error) {
        console.log(error);
    }
}

export async function getValidateCoupon(
    params: any
): Promise<TCouponParams | undefined> {
    try {
        await connectToDatabase();
        const findCoupon = await Coupon.findOne({
            code: params.code,
        }).populate({
            path: "courses",
            select: "_id title",
        });
        const coupon = JSON.parse(JSON.stringify(findCoupon));
        let isActive = true;
        if (!coupon?.active) isActive = false;
        if (coupon?.used >= coupon?.limit) isActive = false;
        if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
            isActive = false;
        if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
            isActive = false;
        return isActive ? coupon : undefined;
    } catch (error) {
        console.log(error);
    }
}