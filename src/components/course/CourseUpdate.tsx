"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { updateCourse } from "@/lib/action/course.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ECourseLevel, ECourseStatus } from "@/types/enum";
import { Textarea } from "../ui/textarea";
import { ICourse } from "@/database/course.model";
import IconAdd from "../icons/IconAdd";
import { useImmer } from "use-immer"
const formSchema = z.object({
    title: z.string().min(10, {
        message: "Tên khóa học ít nhất 10 ký tự",
    }),
    slug: z.string().optional(),
    price: z.number().int().positive().optional(),
    sale_price: z.number().int().positive().optional(),
    desc: z.string().optional(),
    image: z.string().optional(),
    intro_url: z.string().optional(),
    views: z.number().int().optional(),
    status: z.enum([ECourseStatus.APPROVED, ECourseStatus.PENDING, ECourseStatus.REJECT]),
    level: z.enum([ECourseLevel.ADVANCED, ECourseLevel.BEGINNER, ECourseLevel.INTERMEDIATE]),
    info: z.object({
        requirement: z.array(z.string()).optional(),
        benefit: z.array(z.string()).optional(),
        qa: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        })).optional(),
    }).optional(),
    rating: z.array(z.string()).optional(),
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
    // 1. Define your form.
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addProperties, setAddProperties] = useImmer({
        requirement: data.info.requirement,
        benefit: data.info.benefit,
        qa: data.info.qa,
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            slug: data.slug,
            price: data.price,
            sale_price: data.sale_price,
            desc: data.desc,
            image: data.image,
            intro_url: data.intro_url,
            views: data.views,
            status: data.status,
            level: data.level,
            info: {
                requirement: data.info.requirement,
                benefit: data.info.benefit,
                qa: data.info.qa,
            },
            rating: data.rating,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const res = await updateCourse({
                slug: data.slug,
                updateData: {
                    title: values.title,
                    slug: values.slug,
                    price: values.price,
                    sale_price: values.sale_price,
                    desc: values.desc,
                    image: values.image,
                    intro_url: values.intro_url,
                    views: values.views,
                    status: values.status,
                    level: values.level,
                    info: {
                        requirement: addProperties.requirement,
                        benefit: addProperties.benefit,
                        qa: addProperties.qa,
                    },
                }
            })
            if (!res?.success) return toast.error(res?.message)
            toast.success(res?.message)
            router.back();
        } catch (error) {
            toast.error("Cập nhật thất bại")
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5 p-5">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên khóa học</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên khóa học" {...field} />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="duong-dan-khoa-hoc" {...field} />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá khóa học</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="100000" {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sale_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá khóa học sau khi giảm giá</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="80000" {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Mô tả..." {...field} />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <div className="flex outline-none h-40 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border/10 bg-white dark:bg-grayDarker"></div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="intro_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/..." {...field} />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="views"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lượt xem</FormLabel>
                                <FormControl>
                                    <Input className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted" disabled placeholder="0" type="number" {...field} />
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trạng thái</FormLabel>
                                <FormControl>
                                    <div></div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trình độ</FormLabel>
                                <FormControl>
                                    <div></div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Form Yêu cầu */}
                    <FormField
                        control={form.control}
                        name="info.requirement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between items-center gap-5">
                                    <span>Yêu cầu</span>
                                    <button
                                        onClick={() => {
                                            setAddProperties((draft) => {
                                                draft.requirement.push("");
                                            })
                                        }}
                                        className="text-primary hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        type="button">
                                        <IconAdd />
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        {addProperties.requirement.map((item, index) => (
                                            <Input
                                                key={index}
                                                placeholder={`Yêu cầu số ${index + 1}`}
                                                value={item}
                                                onChange={(e) => {
                                                    setAddProperties((draft) => {
                                                        draft.requirement[index] = e.target.value;
                                                    })
                                                }}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Form Lợi ích */}
                    <FormField
                        control={form.control}
                        name="info.benefit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between items-center gap-5">
                                    <span>Lợi ích</span>
                                    <button
                                        type="button"
                                        className="text-primary hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        onClick={(e) => {
                                            setAddProperties((draft) => {
                                                draft.benefit.push("");
                                            })
                                        }}
                                    ><IconAdd></IconAdd></button>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        {addProperties.benefit.map((item, index) => (
                                            <Input
                                                key={index}
                                                placeholder={`Lợi ích số ${index + 1}`}
                                                value={item}
                                                onChange={(e) => {
                                                    setAddProperties((draft) => {
                                                        draft.benefit[index] = e.target.value;
                                                    })
                                                }}
                                            />
                                        ))}
                                        {/* <button
                                            type="button"
                                            className="text-primary hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                            onClick={(e) => {
                                                setAddProperties((draft) => {
                                                    draft.benefit.pop()
                                                })
                                            }}
                                        >
                                            <IconAdd></IconAdd>
                                        </button> */}
                                    </div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="info.qa"
                        render={({ field }) => (
                            <FormItem className="col-start-1 col-end-3">
                                <FormLabel className="flex justify-between items-center gap-5">
                                    <span>Q.A</span>
                                    <button
                                        type="button"
                                        className="text-primary hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        onClick={(e) => {
                                            setAddProperties((draft) => {
                                                draft.qa.push({ question: "", answer: "" })
                                            })
                                        }}
                                    >
                                        <IconAdd></IconAdd>
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-2 gap-5">
                                        {addProperties.qa.map((item, index) => {
                                            return (
                                                <>
                                                    <Input
                                                        key={index}
                                                        placeholder={`Câu hỏi số ${index + 1}`}
                                                        value={item.question}
                                                        onChange={(e) => {
                                                            setAddProperties((draft) => {
                                                                draft.qa[index].question = e.target.value;
                                                            })
                                                        }}
                                                    />
                                                    <Input
                                                        key={index}
                                                        placeholder={`Trả lời câu hỏi số ${index + 1}`}
                                                        value={item.answer}
                                                        onChange={(e) => {
                                                            setAddProperties((draft) => {
                                                                draft.qa[index].answer = e.target.value;
                                                            })
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="dark:text-red-700 text-xs" />
                            </FormItem>
                        )}
                    />

                </div>
                <Button
                    isLoading={isSubmitting}
                    variant="primary"
                    type="submit"
                    className="w-[150px]"
                    disabled={isSubmitting}
                >
                    Cập nhật khóa học
                </Button>
            </form>
        </Form>
    );
};

export default CourseUpdate;