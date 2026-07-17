import React from 'react'
import CouponAddNew from '@/components/coupon/CouponAddNew'
import Heading from '@/components/typography/Heading'


const page = () => {
    return (
        <div className="m-5">
            <Heading>Tạo mới mã giảm giá</Heading>
            <CouponAddNew ></CouponAddNew>
        </div>
    )
}

export default page
