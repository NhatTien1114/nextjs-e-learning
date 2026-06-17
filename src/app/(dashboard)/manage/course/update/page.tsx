import Heading from "@/components/typography/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";

const page = ({
    searchParams,
}: {
    searchParams: {
        slug: string;
    };
}) => {
    return (
        <>
            <Heading>Cập nhật khóa học</Heading>
            <CourseUpdate></CourseUpdate>
        </>
    );
};

export default page;