"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Coupon from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose"

export async function createCoupon(params: any) {
    try {
        await connectToDatabase();
        const newCoupon = await Coupon.create(params);
        return JSON.parse(JSON.stringify(newCoupon));
    } catch (error) {
        console.log(error);
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