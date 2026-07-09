import React, { Suspense } from 'react'
import LessonWrapper from './LessonWrapper'
import LoadingLayer from './@layer/LoadingLayer'
import LoadingOutline from './@outline/LoadingOutline'
import { auth } from '@clerk/nextjs/server'
import PageNotFound from '@/app/not-found'
import { getUserInfo } from '@/lib/action/user.action'

const layout = async ({
    layer,
    outline
}: {
    layer: React.ReactNode,
    outline: React.ReactNode
}) => {
    const { userId } = await auth();
    if (!userId) return <PageNotFound />;
    const findUser = await getUserInfo({ userId });
    if (!findUser) return <PageNotFound />;

    return (
        <LessonWrapper>
            <Suspense fallback={<LoadingLayer />}>{layer}</Suspense>
            <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
        </LessonWrapper>
    )
}

export default layout
