import React from 'react'
import { IconUser } from '../icons'

const IconLogin = () => {
    return (
        <div className="flex items-center justify-center gap-2 lg:px-5 size-10 lg:w-auto rounded-xl bg-primary text-white font-semibold">
            <IconUser className='size-5'></IconUser>
            <strong>Đăng nhập</strong>
        </div>

    )
}

export default IconLogin