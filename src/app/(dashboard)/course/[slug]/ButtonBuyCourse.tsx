"use client"

import { Button } from '@/components/ui/button'
import { ICourse } from '@/database/course.model'
import { IUser } from '@/database/user.model'
import { createOrder } from '@/lib/action/order.action'
import { createOrderCode } from '@/utils'
import React from 'react'
import { toast } from 'react-toastify'

const ButtonBuyCourse = ({ user, courseId, amount }: { user: IUser, courseId: string, amount: number }) => {
    const handleEnroll = async () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để mua khóa học");
            return;
        }
        try {
            const newOrder = await createOrder({
                code: createOrderCode(),
                user: user._id,
                course: courseId,
                total: amount,
                amount: amount
            })
            if (newOrder?.success) {
                toast.success("Mua đơn hàng thành công, đợi duyệt");
                return;
            } else {
                toast.error(newOrder?.message || "Mua không thành công");
                return;
            }
        } catch (error) {
            toast.error("Mua không thành công");
            console.log(error);
            return;
        }
    }


    return (
        <Button
            onClick={handleEnroll}
            variant="primary" className="w-full">
            Mua khóa học
        </Button>
    )
}

export default ButtonBuyCourse
