import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.mode";

type TActiveLinkProps = {
    url: string;
    children: React.ReactNode;
}

type TMenuItems = {
    url: string;
    title: string;
    icon?: React.ReactNode;
    onlyIcon?: boolean;
}

type TUserParams = {
    clerkId: string,
    username: string,
    email: string,
    name?: string,
    avatar?: string
}

type TCourseParams = {
    title: string,
    slug: string,
    author: string
}

type TCourseUpdateParams = {
    slug: string,
    updateData: Partial<ICourse>
    path?: string
}

interface TUpdateCourseParams extends Omit<ICourse, "lectures"> {
    lectures?: ILecture[];
};

type TCreateLectureParams = {
    course: string,
    title?: string,
    order?: number,
    path?: string
}

type TUpdateLectureParams = {
    lectureId: string,
    updateData: Partial<ILecture>
    path?: string
}

export { TActiveLinkProps, TMenuItems, TUserParams, TCourseParams, TCourseUpdateParams, TCreateLectureParams, TUpdateLectureParams, TUpdateCourseParams }