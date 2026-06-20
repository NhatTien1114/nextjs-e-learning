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

export const courseStatus = [
    {
        title: "Đã duyệt",
        value: ECourseStatus.APPROVED,
    },
    {
        title: "Chờ duyệt",
        value: ECourseStatus.PENDING,
    },
    {
        title: "Không phê duyệt",
        value: ECourseStatus.REJECT,
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