import ActiveLink from "@/common/ActiveLink";
import { menuItems } from "@/constants";
import { TMenuItems } from "@/types";
import Link from "next/link";


const Sidebar = () => {
    return (
        <div className="p-5 border-r border-gray-200 h-screen">
            <Link href="/" className="font-bold text-3xl inline-block mb-5"><span className="text-primary">U</span>CADEMY</Link>
            <ul className="flex flex-col gap-3">
                {menuItems.map((item, index) =>
                    <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
                )}
            </ul>
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