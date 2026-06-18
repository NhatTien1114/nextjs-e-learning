"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import slugify from "slugify";

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
import { createCourse } from "@/lib/action/course.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";

const formSchema = z.object({
    title: z.string().min(10, {
        message: "Tên khóa học ít nhất 10 ký tự",
    }),
    slug: z.string().optional(),
    author: z.string().optional(),
});

function CourseAddNew({ user }: { user: IUser }) {
    // 1. Define your form.
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            author: user._id,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const data = {
                title: values.title,
                slug:
                    values.slug ||
                    slugify(values.title, {
                        lower: true,
                        locale: "vi",
                    }),
                author: user._id,
            };
            const res = await createCourse(data);
            if (!res?.success) {
                toast.error(res?.message);
                return;
            }
            toast.success("Tạo khóa học thành công");
            if (res?.data) {
                router.push(`/manage/course/update?slug=${res.data.slug}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
            form.reset();
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
                                    <Input className="dark:bg-grayDarker dark:text-grayDark" placeholder="Tên khóa học" {...field} />
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
                </div>
                <Button
                    isLoading={isSubmitting}
                    variant="primary"
                    type="submit"
                    className="w-[140px]"
                    disabled={isSubmitting}
                >
                    Tạo khóa học
                </Button>
            </form>
        </Form>
    );
}
export default CourseAddNew;