import CouponManage from '@/components/coupon/CouponManage'
import { getCoupon } from '@/lib/action/coupon.action';
import React from 'react'

const page = async () => {
    const coupons = await getCoupon();
    return (
        <CouponManage
            coupons={coupons ? JSON.parse(JSON.stringify(coupons)) : []}
        ></CouponManage>
    )
}

export default page
