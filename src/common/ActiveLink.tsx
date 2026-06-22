"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
    const pathname = usePathname();
    const isActive = url === pathname;
    return (
        <Link
            href={url}
            className={`p-3 rounded-md flex items-center justify-center lg:justify-start gap-3 dark:text-grayDark font-medium transition-all ${isActive
                ? "!text-white bg-primary svg-animate font-semibold"
                : "hover:!text-primary hover:!bg-primary/10"
                } `}
        >
            {children}
        </Link>
    );
};

export default ActiveLink;