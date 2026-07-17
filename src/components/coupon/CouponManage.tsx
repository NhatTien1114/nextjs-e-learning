import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { commonClassNames } from "@/constants";
import Heading from "../typography/Heading";
import IconLeftArrow from "../icons/IconLeftArrow";
import IconRightArrow from "../icons/IconRightArrow";
import Link from "next/link";

const page = () => {
    return (
        <div className="m-5">
            <Link
                href="/manage/coupon/create"
                className="size-10 rounded-full bg-primary flex justify-center items-center text-white fixed right-5 bottom-5 animate-bounce"
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
                <TableBody></TableBody>
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