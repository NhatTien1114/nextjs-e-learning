import CouponUpdate from '@/components/coupon/CouponUpdate'
import Heading from '@/components/typography/Heading'
import { getCouponByCode } from '@/lib/action/coupon.action';
import React from 'react'

const page = async ({ searchParams }: { searchParams: Promise<string> }) => {
    const couponCode = await searchParams;
    if (!couponCode) {
        return;
    }

    const coupon = await getCouponByCode(couponCode);
    if (!coupon) return;
    return (
        <div className="m-5">
            <Heading>Cập nhật mã giảm giá</Heading>
            <CouponUpdate coupon={JSON.parse(JSON.stringify(coupon))} />
        </div>
    )
}

export default page