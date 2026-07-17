"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { commonClassNames, orderStatus } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { cn } from "@/lib/utils";
import { EOrderStatus } from "@/types/enum";
import { debounce } from "lodash";
import Swal from "sweetalert2";
import Heading from "../typography/Heading";
import StatusBadge from "@/common/StatusBadge";
import IconCheck from "../icons/IconCheck";
import IconCancel from "../icons/IconCancel";
import { useSearchParams } from "next/navigation";
import { updateOrderStatus } from "@/lib/action/order.action";
import { toast } from "react-toastify";
interface IOrderManageProps {
    _id: string,
    code: string;
    total: number;
    amount: number;
    discount: number;
    status: EOrderStatus;
    course: {
        title: string;
    };
    user: {
        name: string;
    };
}
const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
    const handleCancelOrder = async ({ orderId, status }: { orderId: string; status: EOrderStatus; }) => {
        Swal.fire({
            title: "Bạn có chắc muốn hủy đơn hàng không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Thoát",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await updateOrderStatus({ orderId, status });
                if (res?.success) {
                    toast.success("Cập nhật thành công")
                }
            }
        });
    };
    const { createQueryString, router, pathname } = useQueryString();
    const handleCompleteOrder = async ({ orderId, status }: { orderId: string; status: EOrderStatus; }) => {
        const res = await updateOrderStatus({ orderId, status });
        if (res?.success) {
            toast.success("Cập nhật thành công")
        }
    };
    const searchParams = useSearchParams();
    const handleSelectStatus = (status: EOrderStatus) => {
        router.push(`${pathname}?${createQueryString("status", status)}`);
    };
    const handleSearchOrder = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("query");
        }

        router.push(`${pathname}?${createQueryString("search", term)}`)
    }
    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
                <Heading>Quản lý đơn hàng</Heading>
                <div className="flex gap-3">
                    <div className="w-full lg:w-[300px]">
                        <Input
                            placeholder="Tìm kiếm đơn hàng..."
                            onChange={(e) => handleSearchOrder(e.target.value)}
                        />
                    </div>
                    <Select
                        onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
                    >
                        <SelectTrigger className="w-[180px] bg-grayDarker">
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="bg-grayDarker">
                            <SelectGroup>
                                {orderStatus.map((status) => (
                                    <SelectItem value={status.value} key={status.value}>
                                        {status.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table className="table-responsive">
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã đơn hàng</TableHead>
                        <TableHead>Khóa học</TableHead>
                        <TableHead>Thành viên</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Mã giảm giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length > 0 &&
                        orders.map((order) => {
                            const orderStatusItem = orderStatus.find(
                                (item) => item.value === order.status
                            );
                            return (
                                <TableRow key={order.code}>
                                    <TableCell>
                                        <strong>{order.code}</strong>
                                    </TableCell>
                                    <TableCell>{order.course.title}</TableCell>
                                    <TableCell>{order.user.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <span>{order.amount.toLocaleString("us-US")}</span>
                                            {order.discount > 0 && (
                                                <span>{order.discount.toLocaleString("us-US")}</span>
                                            )}
                                            <strong
                                                className={cn(
                                                    orderStatusItem?.className,
                                                    "bg-transparent"
                                                )}
                                            >
                                                {order.total.toLocaleString("us-US")}
                                            </strong>
                                        </div>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <StatusBadge item={orderStatusItem}></StatusBadge>
                                    </TableCell>
                                    <TableCell>
                                        {order.status === EOrderStatus.PENDING && (
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    className={commonClassNames.action}
                                                    onClick={() => handleCompleteOrder({
                                                        orderId: order._id,
                                                        status: EOrderStatus.ACCEPTED
                                                    })}
                                                >
                                                    <IconCheck />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={commonClassNames.action}
                                                    onClick={() => handleCancelOrder({
                                                        orderId: order._id,
                                                        status: EOrderStatus.REJECT
                                                    })}
                                                >
                                                    <IconCancel />
                                                </button>
                                            </div>
                                        )}
                                        {order.status === EOrderStatus.ACCEPTED && (
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    className={commonClassNames.action}
                                                    onClick={() => handleCancelOrder({
                                                        orderId: order._id,
                                                        status: EOrderStatus.REJECT
                                                    })}
                                                >
                                                    <IconCancel />
                                                </button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderManage;