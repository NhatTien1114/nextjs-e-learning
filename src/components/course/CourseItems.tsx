import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconEye, IconLock, IconStar } from '../icons';
import { ICourse } from '@/database/course.model';

const CourseItems = ({ data, cta, url }: { data: ICourse, cta?: string, url?: string }) => {
    const courseUrl = url ? url : `/course/${data.slug}`;
    const coursesItem = [
        {
            title: data.views,
            icon: (className?: string) => <IconEye className={className}></IconEye>
        },
        {
            title: "5.0",
            icon: (className?: string) => <IconStar className={className}></IconStar>
        },
        {
            title: "30h25p",
            icon: (className?: string) => <IconLock className={className}></IconLock>
        }
    ];

    return (
        <div className="bg-white dark:bg-grayDarker dark:border-grayDark/50 border border-gray-200 p-4 rounded-2xl flex flex-col">
            <Link href={courseUrl} className="block h-[180px] relative shrink-0">
                <Image
                    src={data.image}
                    alt={data.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover rounded-lg"
                    sizes='@media (min-width: 640px) 300px, 100vw'
                />
                {/* <span className="text-white px-3 py-1 inline-block rounded-full bg-green-500 absolute top-3 right-3 font-xs">New</span> */}
            </Link>
            <div className="pt-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-3 dark:text-white">{data.title}</h3>
                <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark mt-auto">
                    {coursesItem.map((item, index) => (
                        <div className="flex items-center gap-1" key={index}>
                            {item.icon("size-4")}
                            <span>{item.title}</span>
                        </div>
                    ))}
                    <span className="font-bold text-primary ml-auto text-base">
                        {data.price.toLocaleString("vi-VN")}đ
                    </span>
                </div>

                <Link
                    href={courseUrl}
                    className="flex items-center justify-center w-full mt-auto rounded-lg text-white font-semibold bg-primary h-12 dark:bg-primary/90"
                >
                    {cta ? cta : "Xem chi tiết"}
                </Link>
            </div>
        </div>
    )
}

export default CourseItems
