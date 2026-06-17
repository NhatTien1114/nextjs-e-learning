import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { redirect } from "next/navigation";
import { getUserInfo } from '@/lib/action/user.action';
import { EUserRole } from '@/types/enum';
import PageNotFound from '@/app/not-found';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
    const user = await getUserInfo({ userId });
    if (user && user.role !== EUserRole.ADMIN) return (<PageNotFound />);
    return (<>{children}</>);
}

export default AdminLayout
