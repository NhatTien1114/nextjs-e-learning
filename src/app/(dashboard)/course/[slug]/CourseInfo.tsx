/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { IconBook, IconEye, IconLock, IconUser } from '@/components/icons'
import React from 'react'
import ButtonBuyCourse from './ButtonBuyCourse'

const CourseInfo = ({ findUser, data }: { findUser: any, data: any }) => {
    return (
        <div className="bg-white rounded-lg p-5 sticky top-5">
            <div className="flex items-center gap-2 mb-3">
                <strong className="text-primary text-xl font-bold">
                    {data.price.toLocaleString("vi-VN")}đ
                </strong>
                <span className="text-slate-400 line-through text-sm">
                    {data.sale_price.toLocaleString("vi-VN")}đ
                </span>
                <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary/20 text-primary font-semibold text-sm">
                    {Math.floor((data.sale_price / data.price) * 100)}%
                </span>
            </div>
            <h3 className="font-bold mb-3 text-sm text-black">Khóa học gồm có:</h3>
            <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                    <IconLock className="size-4" />
                    <span>30h học</span>
                </li>
                <li className="flex items-center gap-2">
                    <IconEye className="size-4" />
                    <span>Video Full HD</span>
                </li>
                <li className="flex items-center gap-2">
                    <IconUser className="size-4" />
                    <span>Có nhóm hỗ trợ</span>
                </li>
                <li className="flex items-center gap-2">
                    <IconBook className="size-4" />
                    <span>Tài liệu kèm theo</span>
                </li>
            </ul>
            <ButtonBuyCourse
                user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
                courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
                amount={data.price}
            />
        </div>
    )
}

export default CourseInfo
