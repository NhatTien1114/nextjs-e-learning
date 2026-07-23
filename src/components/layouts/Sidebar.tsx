import { ActiveLink } from "@/common";
import { menuItems } from "@/constants";
import { TMenuItems } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/action/user.action";
import { EUserRole } from "@/types/enum";

const Sidebar = async () => {
    const { userId } = await auth();
    const user = userId ? await getUserInfo({ userId }) : null;
    const roleAdmin = user?.role === EUserRole.ADMIN;

    const mainMenuItems = menuItems.filter((item) => !item.url.includes("manage"));
    const manageMenuItems = menuItems.filter((item) => item.url.includes("manage"));

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
                {mainMenuItems.map((item, index) => (
                    <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                ))}
                {roleAdmin && (
                    <>
                        <li className="hidden lg:block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-3 mb-1 px-3">
                            Admin
                        </li>
                        {manageMenuItems.map((item, index) => (
                            <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
};

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
    );
};

export default Sidebar;