"use client"
import { ActiveLink } from "@/common";
import { menuItems } from "@/constants";
import { TMenuItems } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../ui/darkmode";
import { useAuth } from "@clerk/nextjs";
import { IconUser } from "../icons";
import Image from "next/image";


const Sidebar = () => {
    const { userId } = useAuth();
    return (
        <div className="p-3 lg:p-5 border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-grayDark/50 bg-white dark:bg-grayDarker flex lg:flex-col fixed bottom-0 left-0 right-0 lg:sticky lg:top-0 lg:h-screen lg:w-[300px] z-50 justify-between items-center lg:items-stretch lg:justify-start">
            <Link
                href="/"
                className="font-bold text-3xl hidden lg:inline-flex items-baseline gap-0.5 mb-5 h-10 self-start"
            >
                <Image alt="Ucademy" src="/logo.png" width={20} height={20} />
                <span className="text-primary">cademy</span>
            </Link>
            <ul className="flex lg:flex-col gap-2 lg:gap-3 justify-between lg:justify-start flex-1 lg:flex-none w-full lg:w-auto">
                {menuItems.map((item, index) =>
                    <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                )}
            </ul>
            <div className="mt-auto hidden lg:flex items-center justify-end gap-5">
                <ModeToggle></ModeToggle>
                {!userId ? (
                    <Link href={"/sign-in"} className="size-10  p-1 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/80 text-white dark:text-grayDark px-2 py-1.5 transition-all"><IconUser /></Link>
                ) : (<UserButton></UserButton>)}
            </div>

        </div>
    )
}

export const MenuItem = ({
    url = "/",
    title = "",
    icon,
    onlyIcon
}: TMenuItems) => {
    return (
        <li className="flex-1 lg:flex-none">
            <ActiveLink url={url}>
                {icon}
                {onlyIcon ? null : <span className="hidden lg:block">{title}</span>}
            </ActiveLink>
        </li>
    )
}
export default Sidebar;