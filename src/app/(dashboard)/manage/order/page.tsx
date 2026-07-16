import OrderManage from '@/components/order/OrderManage'
import { fetchOrders } from '@/lib/action/order.action'
import React from 'react'

const page = async ({ searchParams }: {
    searchParams: Promise<{
        search: string,
        status: string
    }>
}) => {

    const orders = await fetchOrders({
        search: (await searchParams).search,
        status: (await searchParams).status
    });
    return (
        <div className="m-5">
            <OrderManage
                orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
            ></OrderManage>
        </div>
    )
}

export default page
