import Heading from "@/components/typography/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        slug: string;
    }>;
}) => {
    // const { slug } = await searchParams; // Wait until we actually need slug
    return (
        <>
            <Heading>Cập nhật khóa học</Heading>
            <CourseUpdate></CourseUpdate>
        </>
    );
};

export default page;