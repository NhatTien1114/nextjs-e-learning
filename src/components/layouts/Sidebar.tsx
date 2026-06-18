"use client"
import { ActiveLink } from "@/common";
import { menuItems } from "@/constants";
import { TMenuItems } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../ui/darkmode";
import { useAuth } from "@clerk/nextjs";
import { IconUser } from "../icons";


const Sidebar = () => {
    const { userId } = useAuth();
    return (
        <div className=" sticky top-0 hidden p-5 border-r border-r-gray-200 dark:border-grayDark/50 dark:bg-grayDarker lg:flex flex-col h-screen">
            <Link href="/" className="font-bold text-3xl inline-block mb-5"><span className="text-primary">U</span>CADEMY</Link>
            <ul className="flex flex-col gap-3">
                {menuItems.map((item, index) =>
                    <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                )}
            </ul>
            <div className="mt-auto flex items-center justify-end gap-5">
                <ModeToggle></ModeToggle>
                {!userId ? (
                    <Link href={"/sign-in"} className="size-10  p-1 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/80 text-white dark:text-grayDark px-2 py-1.5 transition-all"><IconUser /></Link>
                ) : (<UserButton></UserButton>)}
            </div>

        </div>
    )
}

const MenuItem = ({
    url = "/",
    title = "",
    icon
}: TMenuItems) => {
    return (
        <li>
            <ActiveLink url={url}> {icon} {title}</ActiveLink>
        </li>
    )
}
export default Sidebar;