import Sidebar from '@/components/layouts/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="wrapper grid grid-cols-[300px_minmax(0,1fr)]">
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    )
}

export default layout
