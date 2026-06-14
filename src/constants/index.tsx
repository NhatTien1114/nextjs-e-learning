import { IconCourse, IconHome } from "@/components/icons";

export const menuItems: {
    url: string;
    title: string;
    icon?: React.ReactNode;
}[] = [
        {
            url: "/",
            title: "Home",
            icon: <IconHome className="size-5" />
        },
        {
            url: "/course",
            title: "Course",
            icon: <IconCourse className="size-5" />
        }
    ]
