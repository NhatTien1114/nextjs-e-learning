import { ICourse } from "@/database/course.model";

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
    updateData: Partiel<ICourse>
    path?: string
}

type TCourseContent = {
    course: string,

}
export { TActiveLinkProps, TMenuItems, TUserParams, TCourseParams, TCourseUpdateParams }