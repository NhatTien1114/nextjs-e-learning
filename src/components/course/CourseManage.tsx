"use client";
import React, { useCallback, useEffect, useState } from 'react'

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
import { updateCourse } from '@/lib/action/course.action'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IconBook, IconEye } from '../icons'
import IconEdit from '../icons/IconEdit'
import IconDelete from '../icons/IconDelete'
import { ICourse } from '@/database/course.model'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import IconLeftArrow from '../icons/IconLeftArrow';
import IconRightArrow from '../icons/IconRightArrow';
import Heading from '../typography/Heading';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ActionEdit from '@/common/ActionEdit';

const CourseManage = ({ courses }: { courses: ICourse[] }) => {

    const handelDeleteCourse = async (slug: string) => {
        try {
            Swal.fire({
                title: "Bạn có chắc chắn xóa?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateCourse({
                        slug,
                        updateData: {
                            status: ECourseStatus.PENDING,
                            _destroy: true
                        },
                        path: "/manage/course"
                    })
                    toast.success("Xóa khóa học thành công")
                }
            });
        } catch (error) {
            toast.error("Xóa khóa học thất bại")
            console.log(error);
        }
    }

    const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
        try {
            Swal.fire({
                title: "Bạn có chắc chắn cập nhật?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Cập nhật"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateCourse({
                        slug,
                        updateData: {
                            status: status === ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING,
                            _destroy: false
                        },
                        path: "/manage/course"
                    })
                    toast.success("Cập nhật trạng thái thành công")
                }
            });
        } catch (error) {
            toast.error("Cập nhật trạng thái khóa học thất bại")
            console.log(error);
        }
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("search", term); // Sets ?query=your_input
        } else {
            params.delete("query"); // Removes parameter if input is empty
        }

        // Updates the URL without reloading the page
        router.push(`${pathname}?${createQueryString("search", term)}`);
    }

    const handleStatus = (status: ECourseStatus) => {
        router.push(`${pathname}?${createQueryString("status", status)}`);
    }

    const [page, setPage] = useState(1);
    const handleChangePage = (type: "prev" | "next") => {
        if (type === "prev" && page === 1) return;
        if (type === "prev") setPage((prev) => prev - 1);
        if (type === "next") setPage((prev) => prev + 1);
    }

    useEffect(() => {
        router.push(`${pathname}?${createQueryString("page", page.toString())}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading>
                    Quản lý khóa học
                </Heading>
                <div className="flex gap-3 mt-5">
                    <Input
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Tìm kiếm khóa học..."
                        className="w-full"
                    />
                    <Select
                        onValueChange={(value) => handleStatus(value as ECourseStatus)}
                    >
                        <SelectTrigger className="w-full z-10 bg-white dark:bg-grayDarker border border-gray-200 hover:border-primary/70 transition-all">
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-grayDarker w-full">
                            <SelectGroup>
                                <SelectLabel>Chọn trạng thái</SelectLabel>
                                {courseStatus.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <Link
                href="/manage/course/create"
                className="size-10 rounded-full bg-primary flex justify-center items-center text-white fixed right-5 bottom-5 animate-bounce"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </Link>
            <Table className="table-responsive">
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
                                    <div className="grid gap-2">
                                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                                            {course.title}
                                        </h3>
                                        <h4 className="text-xs lg:text-sm text-slate-500">
                                            {new Date(course.created_at).toLocaleDateString('vi-VN')}
                                        </h4>
                                    </div>

                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-sm lg:text-base">
                                    {course.price ? `${course.price.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                                </span>
                            </TableCell>
                            <TableCell>
                                <button
                                    type='button'
                                    onClick={() => { handleChangeStatus(course.slug, course.status) }}
                                    className={cn(
                                        commonClassNames.status,
                                        courseStatus.find((item) => item.value === course.status)?.className
                                    )}>
                                    {courseStatus.find((item) => item.value === course.status)?.title}
                                </button>
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
                                    <ActionEdit
                                        onClick={() => handelDeleteCourse(course.slug)}
                                        icon="delete"
                                        url={`/manage/course/course-content?slug=${course.slug}`}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-end gap-3 mt-5">
                <button
                    onClick={() => handleChangePage("prev")}
                    className={commonClassNames.paginationButton}>
                    <IconLeftArrow />
                </button>
                <button
                    onClick={() => handleChangePage("next")}
                    className={commonClassNames.paginationButton}>
                    <IconRightArrow />
                </button>
            </div>
        </>
    )
}

export default CourseManage