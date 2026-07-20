import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Loading = () => {
    return (
        <div>
            {/* Header */}
            <div className="m-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">
                <div className="h-10 w-64 skeleton rounded-lg"></div>
                <div className="flex gap-3">
                    <div className="h-10 w-[200px] skeleton rounded-md"></div>
                    <div className="h-10 w-[150px] skeleton rounded-md"></div>
                </div>
            </div>

            {/* Table */}
            <Table className="m-5 table-responsive">
                <TableHeader>
                    <TableRow>
                        <TableHead className="h-2 inline-block w-[100px] text-center gap-4 rounded-lg skeleton"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="w-[80px] h-[60px] rounded-md skeleton flex-shrink-0"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="h-5 w-40 skeleton rounded-md"></div>
                                        <div className="h-4 w-20 skeleton rounded-md"></div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="h-5 w-24 skeleton rounded-md"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-8 w-24 skeleton rounded-md"></div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <div className="size-8 skeleton rounded-md"></div>
                                    <div className="size-8 skeleton rounded-md"></div>
                                    <div className="size-8 skeleton rounded-md"></div>
                                    <div className="size-8 skeleton rounded-md"></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Loading