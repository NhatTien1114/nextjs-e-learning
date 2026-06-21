
import CourseManage from '@/components/course/CourseManage'
import Heading from '@/components/typography/Heading'
import { Button } from '@/components/ui/button'
import { getAllCourse } from '@/lib/action/course.action'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <Heading>
                    Quản lý khóa học
                </Heading>
                <Link href="/manage/course/create">
                    <Button className="text-white bg-primary hover:bg-primary/80 cursor-pointer gap-2 mt-5 mr-2">
                        <PlusIcon />
                        Thêm khóa học
                    </Button>
                </Link>
            </div>
            <div className="m-5">
                <CourseManage></CourseManage>
            </div>

        </div>
    )
}

export default page
