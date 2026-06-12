import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="p-5 border-r border-gray-200 h-screen">
            <Link href="/" className="font-bold text-3xl inline-block mb-5">UCADEMY</Link>
            <ul>
                <MenuItem url="/" title="Home" />
                <MenuItem url="/courses" title="Courses" />
                <MenuItem url="/profile" title="Profile" />
            </ul>
        </div>
    )
}

const MenuItem = ({
    url = "/",
    title = ""
}: {
    url: string;
    title: string;
}) => {
    return (
        <li>
            <Link href={url} className="p-3 rounded-md flex items-center">{title}</Link>
        </li>
    )
}
export default Sidebar;