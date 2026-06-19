import Heading from "@/components/typography/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCourseBySlug } from "@/lib/action/course.action";

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        slug: string;
    }>;
}) => {
    const { slug } = await searchParams;
    const findCourse = await getCourseBySlug({
        slug: slug,
    });
    if (!findCourse) return null;
    return (
        <>
            <Heading>Cập nhật khóa học</Heading>
            <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))}></CourseUpdate>
        </>
    );
};

export default page;