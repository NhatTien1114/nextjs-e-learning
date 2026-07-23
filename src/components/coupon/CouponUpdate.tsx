"use client";

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { couponTypes, formSchema } from "@/constants";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ECouponType } from "@/types/enum";
import { NumericFormat } from 'react-number-format';
import React, { useEffect, useState } from 'react'
import z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICoupon } from "@/database/coupon.model";
import { Calendar } from "@/components/ui/calendar";
import IconClose from "../icons/IconClose";
import { Checkbox } from "../ui/checkbox";
import { debounce } from "lodash";
import { getAllCourse } from "@/lib/action/course.action";
import { ICourse } from "@/database/course.model";
import { updateCoupon } from "@/lib/action/coupon.action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CouponUpdate = ({ coupon }: { coupon: ICoupon }) => {

    const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([]);
    const [selectedCourses, setSelectedCourses] = useState<ICourse[]>(
        (coupon.courses as unknown as ICourse[]) || []
    );
    const [startDate, setStartDate] = useState<Date | undefined>(
        coupon.start_date ? new Date(coupon.start_date) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        coupon.end_date ? new Date(coupon.end_date) : undefined
    );
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            active: coupon.active,
            value: coupon.value,
            type: coupon.type,
            limit: coupon.limit,
            code: coupon.code,
            title: coupon.title,
        },
    });

    const handleSearch = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const search = e.target.value
            const courseList = await getAllCourse({ search: search });
            if (!courseList) {
                setFindCourse([]);
                return
            }
            setFindCourse(courseList as ICourse[])
        } catch (error) {
            console.log(error)
        }
    }, 250)

    useEffect(() => {
        form.setValue("courses", selectedCourses.map((c) => c._id));
    }, [selectedCourses, form]);

    const handleSelectCourse = async (checked: boolean | string, course: ICourse) => {
        if (checked) {
            setSelectedCourses((prev) => [...prev, course]);
        } else {
            setSelectedCourses((prev) => prev.filter((selectedCourse) => selectedCourse._id !== course._id));
        }
    }

    const couponTypeWatch = useWatch({
        control: form.control,
        name: 'type'
    });

    const router = useRouter();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await updateCoupon({
                _id: coupon._id,
                updateData: {
                    ...values,
                    start_date: startDate,
                    end_date: endDate,
                    courses: selectedCourses.map((c) => c._id),
                },
                path: "/manage/coupon"
            })

            if (res.success) {
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
                setTimeout(() => {
                    router.push("/manage/coupon");
                }, 1000);
                return;
            }
        } catch (error) {
            Swal.fire({
                title: "Lỗi khi cập nhật!",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tiêu đề</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tiêu đề" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled
                                        placeholder="Mã giảm giá"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(e.target.value.toUpperCase())
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày bắt đầu</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className="w-full">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {startDate ? startDate.toLocaleDateString("vi-VN") : "Chọn ngày"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                className="bgDarkMode border borderDarkMode"
                                                mode="single"
                                                selected={startDate}
                                                onSelect={setStartDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày kết thúc</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className="w-full">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {endDate ? endDate.toLocaleDateString("vi-VN") : "Chọn ngày"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                className="bgDarkMode border borderDarkMode"
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loại coupon</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex gap-5 mt-5"
                                        defaultValue={coupon.type}
                                        onValueChange={field.onChange}
                                    >
                                        {couponTypes.map((type) => (
                                            <div
                                                className="flex items-center space-x-2"
                                                key={type.value}
                                            >
                                                <RadioGroupItem value={type.value} id={type.value} />
                                                <Label htmlFor={type.value}>{type.title}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá trị</FormLabel>
                                <FormControl>
                                    {couponTypeWatch === ECouponType.AMOUNT ? (
                                        <NumericFormat
                                            className="flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border/10 bg-white dark:bg-grayDarker borderDarkMode"
                                            thousandSeparator=","
                                            customInput={Input}
                                            placeholder="Ví dụ: 50,000"
                                            defaultValue={field.value}
                                            onValueChange={(value) => field.onChange(Number(value.floatValue))}
                                        />
                                    ) : (
                                        <Input
                                            type="number"
                                            placeholder="50%"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trạng thái</FormLabel>
                                <FormControl>
                                    <div className="mt-5 flex gap-3 items-center">
                                        <Switch
                                            className="border border-gray-500"
                                            id={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor={field.name}></Label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="limit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số lượng tối đa</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="100"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="courses"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Khóa học</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tìm kiếm khóa học..."
                                        onChange={handleSearch}
                                    />
                                </FormControl>
                                {findCourse && findCourse.length > 0 && (
                                    <div className="flex flex-col gap-2 !mt-5">
                                        {findCourse?.map((course) => (
                                            <Label
                                                key={course.title}
                                                className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                                                htmlFor={course.title}
                                            >
                                                <Checkbox
                                                    id={course.title}
                                                    onCheckedChange={(checked) =>
                                                        handleSelectCourse(checked, course)
                                                    }
                                                    checked={selectedCourses.some(
                                                        (el) => el._id === course._id
                                                    )}
                                                />
                                                <span>{course.title}</span>
                                            </Label>
                                        ))}
                                    </div>
                                )}
                                {selectedCourses.length > 0 && (
                                    <div className="flex items-start flex-wrap gap-2 !mt-5">
                                        {selectedCourses?.map((course) => (
                                            <div
                                                key={course.title}
                                                className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                                            >
                                                <span>{course.title}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelectCourse(false, course)}
                                                >
                                                    <IconClose className="size-5 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant="primary" className="w-[150px] ml-auto flex">
                    Cập nhật
                </Button>
            </form>
        </Form>
    )
}

export default CouponUpdate