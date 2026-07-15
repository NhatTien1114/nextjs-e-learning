import { IconBook, IconComment, IconCourse, IconHome, IconOrder, IconUser } from "@/components/icons";
import { ECourseLevel, ECourseStatus, EOrderStatus } from "@/types/enum";

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

export const orderStatus: {
    title: string,
    value: EOrderStatus,
    className?: string
}[] = [
        {
            title: "Đã duyệt",
            value: EOrderStatus.ACCEPTED,
            className: "text-green-500 bg-green-500/10",
        },
        {
            title: "Chờ duyệt",
            value: EOrderStatus.PENDING,
            className: "text-orange-500 bg-orange-500/10",
        },
        {
            title: "Không phê duyệt",
            value: EOrderStatus.REJECT,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editorOptions = (field: any, theme: any) => ({
    initialValue: "",
    onBlur: field.onBlur,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEditorChange: (content: any) => field.onChange(content),
    init: {
        codesample_global_prismjs: true,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        height: 300,
        menubar: false,
        plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "heading",
        ],
        toolbar:
            "undo redo | " +
            "codesample | bold italic forecolor | alignleft aligncenter |" +
            "alignright alignjustify | bullist numlist |" +
            "image |" +
            "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
            "link",
        content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
    },
});

export const lastLesson = "lastLesson"