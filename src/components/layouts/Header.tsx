"use client"
import React from 'react'
import { IconUser } from '@/components/icons'
import { ModeToggle } from '../ui/darkmode'
import { useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import IconLogin from '../ui/icon-login'

const Header = () => {
    const { userId } = useAuth();

    return (
        <div className="sticky top-5 z-10 m-5 bg-white/50 dark:bg-darkHeader border borderDarkMode rounded-lg backdrop-blur-md py-3 ">
            <div className='flex items-center justify-end gap-3 mr-3'>
                <ModeToggle></ModeToggle>
                {!userId ? (
                    <Link href={"/sign-in"} className="flex items-center justify-center size-5 lg:w-auto"><IconLogin /></Link>
                ) : (<UserButton></UserButton>)}
            </div>
        </div>
    )
}

export default Header