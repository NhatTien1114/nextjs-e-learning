"use client"
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { commonClassNames } from "@/constants";
import Heading from "../typography/Heading";
import IconLeftArrow from "../icons/IconLeftArrow";
import IconRightArrow from "../icons/IconRightArrow";
import Link from "next/link";
import { ICoupon } from "@/database/coupon.model";
import { ECouponType } from "@/types/enum";
import StatusBadge from "@/common/StatusBadge";
import ActionEdit from "@/common/ActionEdit";
import Swal from "sweetalert2";
import { deleteCoupon } from "@/lib/action/coupon.action";

const page = ({ coupons }: { coupons: ICoupon[] }) => {
    const handleDeleteCoupon = async (couponCode: string) => {
        try {
            Swal.fire({
                title: "Bạn có chắc chắn xóa?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Đồng ý xóa!",
                cancelButtonText: "Hủy bỏ!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteCoupon(couponCode);
                    Swal.fire({
                        title: "Xóa thành công!",
                        icon: "success",
                        showConfirmButton: false,
                    });
                    return;
                }
            });
        } catch (error) {
            Swal.fire({
                title: "Lỗi khi xóa!",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <div className="m-5">
            <Link
                href="/manage/coupon/create"
                className="size-10 z-10 rounded-full bg-primary flex justify-center items-center text-white fixed right-5 bottom-5 animate-bounce"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
                <Heading>Quản lý mã giảm giá</Heading>
                <div className="flex gap-3">
                    <div className="w-full lg:w-[300px]">
                        <Input placeholder="Tìm kiếm coupon..." />
                    </div>
                </div>
            </div>
            <Table className="table-responsive">
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã</TableHead>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Giảm giá</TableHead>
                        <TableHead>Sử dụng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coupons?.map((coupon) => (
                        <TableRow key={coupon._id}>
                            <TableCell><strong>{coupon.code}</strong></TableCell>
                            <TableCell>{coupon.title}</TableCell>
                            <TableCell>{coupon.type === ECouponType.AMOUNT ? coupon.value.toLocaleString("en-US") : coupon.value} {coupon.type === ECouponType.PERCENT ? "%" : "VNĐ"}</TableCell>
                            <TableCell>{coupon.used ? coupon.used : 0} / {coupon.limit ? coupon.limit : 0}</TableCell>
                            <TableCell>
                                <StatusBadge item={{ title: coupon.active ? "Đang hoạt động" : "Không hoạt động", className: coupon.active ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10" }}></StatusBadge>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <ActionEdit
                                        icon="edit"
                                        url={`/manage/coupon/update?code=${coupon.code}`}
                                    ></ActionEdit>

                                    <ActionEdit
                                        icon="delete"
                                        onClick={() => handleDeleteCoupon(coupon.code)}
                                    ></ActionEdit>
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-end gap-3 mt-5">
                <button className={commonClassNames.paginationButton}>
                    <IconLeftArrow />
                </button>
                <button className={commonClassNames.paginationButton}>
                    <IconRightArrow />
                </button>
            </div>
        </div>
    );
};

export default page;