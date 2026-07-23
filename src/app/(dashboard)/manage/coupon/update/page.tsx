import CouponUpdate from '@/components/coupon/CouponUpdate'
import Heading from '@/components/typography/Heading'
import { getCouponByCode } from '@/lib/action/coupon.action';
import React from 'react'

const page = async ({ searchParams }: { searchParams: Promise<{ code: string }> }) => {
    const { code } = await searchParams;
    if (!code) {
        return;
    }

    const coupon = await getCouponByCode({ code });
    if (!coupon) return;
    return (
        <div className="m-5">
            <Heading>Cập nhật mã giảm giá</Heading>
            <CouponUpdate coupon={JSON.parse(JSON.stringify(coupon))} />
        </div>
    )
}

export default page