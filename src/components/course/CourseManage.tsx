import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { commonClassNames, courseStatus } from '@/constants'
import { ECourseStatus } from '@/types/enum'
import { getAllCourse } from '@/lib/action/course.action'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IconBook, IconEye } from '../icons'
import IconEdit from '../icons/IconEdit'
import IconDelete from '../icons/IconDelete'

const CourseManage = async () => {
    const courses = await getAllCourse();
    console.log(courses)
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thông tin</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses?.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={course.image || ''}
                                        alt={course.title || ''}
                                        width={80}
                                        height={60}
                                        className="rounded-md object-cover flex-shrink-0"
                                    />
                                    <div className="font-medium text-sm">
                                        {course.title}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-semibold">
                                    {course.price ? `${course.price.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={cn(
                                        commonClassNames.status,
                                        courseStatus.find((item) => item.value === course.status)?.className
                                    )}>
                                    {courseStatus.find((item) => item.value === course.status)?.title}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <Link
                                        href={`/manage/course/update?slug=${course.slug}`}
                                        className={commonClassNames.action}
                                    >
                                        <IconBook />
                                    </Link>
                                    <Link
                                        href={`/manage/course/${course.slug}`}
                                        target="_blank"
                                        className={commonClassNames.action}
                                    >
                                        <IconEye />
                                    </Link>
                                    <Link
                                        href=""
                                        className={commonClassNames.action}
                                    >
                                        <IconEdit />
                                    </Link>
                                    <button className={commonClassNames.action}>
                                        <IconDelete />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default CourseManage