
import CourseAddNew from '@/components/course/CouseAddNew'
import Heading from '@/components/typography/Heading'
import { getUserInfo } from '@/lib/action/user.action'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const user = await getUserInfo({ userId });
    if (!user) return;
    return (
        <>
            <Heading>Thêm khóa học</Heading>
            <CourseAddNew user={JSON.parse(JSON.stringify(user))} />
        </>
    )
}

export default page