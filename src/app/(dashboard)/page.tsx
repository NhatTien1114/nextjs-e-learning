import { CourseGrid } from '@/common'
import CourseItems from '@/components/course/CourseItems'
import Heading from '@/components/typography/Heading'
import { createUser } from '@/lib/action/user.action'
import React from 'react'

const page = async () => {
    const user = await createUser({
        clerkId: "bin_123",
        username: "binbin",
        email: "bin@gmail.com"
    });
    console.log(user);
    return (
        <>
            <Heading>Khám phá</Heading>
            <CourseGrid>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
                <CourseItems></CourseItems>
            </CourseGrid>
        </>
    )
}

export default page
