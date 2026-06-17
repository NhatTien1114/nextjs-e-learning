
import Heading from '@/components/typography/Heading'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="flex justify-between items-center p-5">
                <Heading>
                    Quản lý khóa học
                </Heading>
                <Link href="/manage/course/create">
                    <Button className="text-white bg-primary hover:bg-primary/80 cursor-pointer gap-2 mt-5">
                        <PlusIcon />
                        Thêm khóa học
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default page
