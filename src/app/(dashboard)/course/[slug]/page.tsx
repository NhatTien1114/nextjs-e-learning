
import { IconBook, IconEye, IconLock, IconUser } from "@/components/icons";
import { courseLevelDisplay } from "@/constants";
import { getCourseBySlug } from "@/lib/action/course.action";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TUpdateCourseLecture } from "@/types";
import LessonItem from "@/components/lesson/LessonItem";
import ButtonBuyCourse from "./ButtonBuyCourse";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/action/user.action";

const page = async ({ params }: { params: Promise<{ slug: string; }>; }) => {
    const { slug } = await params;
    const data = await getCourseBySlug({ slug });
    if (!data) return null;


    const { userId } = await auth();
    const findUser = await getUserInfo({ userId: userId || "" });

    const split = data.intro_url?.split("be/")[1];
    const lectures = JSON.parse(JSON.stringify(data.lectures || []));
    return (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen p-5">
            <div>
                <div className="relative aspect-video mb-5">
                    {data.intro_url ?
                        <iframe width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${split}`}
                            className="h-full w-full object-fill rounded-lg"
                        ></iframe>
                        :
                        <Image
                            src={data.image}
                            alt=""
                            fill
                            className="w-full h-full object-cover rounded-lg"
                        />
                    }

                </div>
                <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
                <BoxSection title="Mô tả">
                    <div className="leading-normal">{data.desc}</div>
                </BoxSection>
                <BoxSection title="Thông tin">
                    <div className="grid grid-cols-4 gap-5 mb-10">
                        <BoxInfo title="Bài học">100</BoxInfo>
                        <BoxInfo title="Lượt xem">100</BoxInfo>
                        <BoxInfo title="Trình độ">{courseLevelDisplay[data.level]}</BoxInfo>
                        <BoxInfo title="Thời lượng">100</BoxInfo>
                    </div>
                </BoxSection>
                <BoxSection title="Nội dung khóa học">
                    <div className="flex flex-col gap-5">
                        {lectures.map((lecture: TUpdateCourseLecture) => (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                key={lecture._id}
                            >
                                <AccordionItem value={lecture._id}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3 justify-between w-full pr-5">
                                            <div>{lecture.title}</div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="!bg-transparent border-none">
                                        {lecture.lessons.map((lesson) => (
                                            <LessonItem
                                                key={lesson._id}
                                                lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : undefined}
                                            />
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </BoxSection>
                <BoxSection title="Yêu cầu">
                    {data.info.requirement.map((r, index) => (
                        <div key={index} className="mb-3 flex items-center gap-2">
                            <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </span>
                            <span>{r}</span>
                        </div>
                    ))}
                </BoxSection>
                <BoxSection title="Lợi ích">
                    {data.info.benefit.map((r, index) => (
                        <div key={index} className="mb-3 flex items-center gap-2">
                            <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </span>
                            <span>{r}</span>
                        </div>
                    ))}
                </BoxSection>
                <BoxSection title="Q.A">
                    {Array.isArray(data.info?.qa) && data.info.qa.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                            {data.info.qa.map((qa: { question: string; answer: string }, index: number) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{qa.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {qa.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </BoxSection>
            </div>
            <div>
                <div className="bg-white rounded-lg p-5 sticky top-5">
                    <div className="flex items-center gap-2 mb-3">
                        <strong className="text-primary text-xl font-bold">
                            {data.price.toLocaleString("vi-VN")}đ
                        </strong>
                        <span className="text-slate-400 line-through text-sm">
                            {data.sale_price.toLocaleString("vi-VN")}đ
                        </span>
                        <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary/20 text-primary font-semibold text-sm">
                            {Math.floor((data.sale_price / data.price) * 100)}%
                        </span>
                    </div>
                    <h3 className="font-bold mb-3 text-sm text-black">Khóa học gồm có:</h3>
                    <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2">
                            <IconLock className="size-4" />
                            <span>30h học</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconEye className="size-4" />
                            <span>Video Full HD</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconUser className="size-4" />
                            <span>Có nhóm hỗ trợ</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconBook className="size-4" />
                            <span>Tài liệu kèm theo</span>
                        </li>
                    </ul>
                    <ButtonBuyCourse
                        user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
                        courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
                        amount={data.price}
                    />
                </div>
            </div>
        </div>
    );
};

function BoxInfo({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg p-5 dark:bg-grayDarker">
            <h4 className="text-sm text-slate-400 font-normal dark:text-gray-500">{title}</h4>
            <h3 className="font-bold dark:text-gray-50">{children}</h3>
        </div>
    );
}

function BoxSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <h2 className="font-bold text-xl mb-5">{title}</h2>
            <div className="mb-10">{children}</div>
        </>
    );
}

export default page;