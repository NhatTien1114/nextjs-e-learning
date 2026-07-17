import Link from 'next/link'
import React from 'react'

const AlreadyEnroll = () => {
    return (
        <div className="bg-white rounded-lg p-5 sticky top-5 text-black">
            Bạn đã mua khóa học này, vui lòng nhân vào <strong className="text-primary"><Link href="/study">VÀO ĐÂY</Link></strong> để học
        </div>
    )
}

export default AlreadyEnroll
