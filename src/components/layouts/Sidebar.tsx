import { ActiveLink } from "@/common";
import { menuItems } from "@/constants";
import { TMenuItems } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../ui/darkmode";


const Sidebar = () => {
    return (
        <div className="p-5 border-r border-r-gray-200 dark:border-opacity-10 bg-white dark:bg-grayDarker flex flex-col h-screen">
            <Link href="/" className="font-bold text-3xl inline-block mb-5"><span className="text-primary">U</span>CADEMY</Link>
            <ul className="flex flex-col gap-3">
                {menuItems.map((item, index) =>
                    <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                )}
            </ul>
            <div className="mt-auto flex items-center justify-end gap-5">
                <ModeToggle></ModeToggle>
                <UserButton></UserButton>
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