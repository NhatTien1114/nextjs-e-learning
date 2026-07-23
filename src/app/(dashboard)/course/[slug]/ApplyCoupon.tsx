"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { getValidateCoupon } from '@/lib/action/coupon.action';
import { ECouponType } from '@/types/enum';
import { toast } from 'react-toastify';

const ApplyCoupon = ({ price, setPrice }: { price: number, setPrice: React.Dispatch<React.SetStateAction<number>> }) => {
    const [couponCode, setCouponCode] = useState<string>("");
    const handleApplyCoupon = async () => {
        try {
            // handle valid coupon code
            const response = await getValidateCoupon({
                code: couponCode.toUpperCase(),
            });
            const couponType = response?.type;
            let finalPrice = price;
            if (!response) {
                toast.error("Mã giảm giá không hợp lệ");
                return;
            }

            if (couponType === ECouponType.PERCENT) {
                finalPrice = price - (price * response?.value) / 100;
            } else if (couponType === ECouponType.AMOUNT) {
                finalPrice = price - response?.value;
            }
            setPrice(finalPrice);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="mt-5 w-full flex relative justify-start items-center">
            <div className="flex flex-col">
                <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="dark:bg-transparent dark:border text-grayDark !border-gray-200" placeholder="Mã giảm giá" />
                <button onClick={handleApplyCoupon} className="absolute mr-10 right-0 top-1/2 -translate-y-1/2 text-black text-md">Áp dụng</button>
            </div>
        </div>
    )
}

export default ApplyCoupon