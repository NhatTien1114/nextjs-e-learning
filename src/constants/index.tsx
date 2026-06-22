import { IconBook, IconComment, IconCourse, IconHome, IconOrder, IconUser } from "@/components/icons";
import { ECourseLevel, ECourseStatus } from "@/types/enum";

export const menuItems: {
    url: string;
    title: string;
    icon?: React.ReactNode;
}[] = [
        {
            url: "/",
            title: "Khám phá",
            icon: <IconHome className="size-5" />
        },
        {
            url: "/study",
            title: "Khu vực học tập",
            icon: <IconBook className="size-5" />
        },
        {
            url: "/manage/course",
            title: "Quản lý khóa học",
            icon: <IconCourse className="size-5" />
        },
        {
            url: "/manage/member",
            title: "Quản lý học viên",
            icon: <IconUser className="size-5" />
        },
        {
            url: "/manage/order",
            title: "Quản lý đơn hàng",
            icon: <IconOrder className="size-5" />
        },
        {
            url: "/manage/comment",
            title: "Quản lý bình luận",
            icon: <IconComment className="size-5" />
        }
    ]

export const courseStatus: {
    title: string,
    value: ECourseStatus,
    className?: string
}[] = [
        {
            title: "Đã duyệt",
            value: ECourseStatus.APPROVED,
            className: "text-green-500 bg-green-500/10",
        },
        {
            title: "Chờ duyệt",
            value: ECourseStatus.PENDING,
            className: "text-orange-500 bg-orange-500/10",
        },
        {
            title: "Không phê duyệt",
            value: ECourseStatus.REJECT,
            className: "text-red-500 bg-red-500/10",
        }
    ]

export const courseLevel = [
    {
        title: "Dễ",
        value: ECourseLevel.BEGINNER
    },
    {
        title: "Trung bình",
        value: ECourseLevel.INTERMEDIATE
    },
    {
        title: "Khó",
        value: ECourseLevel.ADVANCED
    }
]

export const courseLevelDisplay: Record<ECourseLevel, string> = {
    [ECourseLevel.BEGINNER]: "Dễ",
    [ECourseLevel.INTERMEDIATE]: "Trung bình",
    [ECourseLevel.ADVANCED]: "Khó",
}

export const commonClassNames = {
    status:
        "border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap",
    action:
        "size-8 rounded-md border flex items-center justify-center p-2 text-gray-500 hover:border-gray-500/80 dark:bg-transparent dark:border-gray-200/10 dark:hover:border-gray-200/20",
    paginationButton:
        "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary",
};