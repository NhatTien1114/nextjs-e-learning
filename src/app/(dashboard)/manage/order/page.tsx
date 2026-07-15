import OrderManage from '@/components/order/OrderManage'
import { fetchOrders } from '@/lib/action/order.action'
import React from 'react'

const page = async () => {

    const orders = await fetchOrders({});
    return (
        <div className="m-5">
            <OrderManage
                orders={orders ? JSON.parse(JSON.stringify(orders)) : null}
            ></OrderManage>
        </div>
    )
}

export default page
