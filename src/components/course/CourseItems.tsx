import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconEye, IconLock, IconStar } from '../icons';

const CourseItems = () => {

    const coursesItem = [
        {
            title: "3000",
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
        <div className="bg-white dark:bg-grayDarker dark:border/10 border border-gray-200 p-4 rounded-2xl">
            <Link href="#" className="inline-block h-[180px] relative">
                <Image
                    src="https://images.unsplash.com/photo-1780840918404-2033f4ff6d3b?q=80&w=1470&auto
                    =format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width={600}
                    height={400}
                    className="h-full w-full object-cover rounded-lg"
                    sizes='@media (min-width: 640px) 300px, 100vw'
                />
                <span className="text-white px-3 py-1 inline-block rounded-full bg-green-500 absolute top-3 right-3 font-xs">New</span>
                <div className="pt-4">
                    <h3 className="font-bold text-lg mb-3 dark:text-white">Khóa học NextJs - Xây dựng E-Learning system hoàn chỉnh</h3>
                    <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
                        {coursesItem.map((item, index) => (
                            <div className="flex items-center gap-1" key={index}>
                                {item.icon("size-4")}
                                <span>{item.title}</span>
                            </div>
                        ))}
                        <span className="font-bold text-primary ml-auto text-base">
                            799.000đ
                        </span>
                    </div>

                    <Link
                        href="#"
                        className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12 dark:bg-primary/90"
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </Link>
        </div>
    )
}

export default CourseItems
