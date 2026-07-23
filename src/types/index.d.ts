import { ICoupon } from "@/database/coupon.model";
import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.mode";
import { ILesson } from "@/database/lesson.model";

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
    lectures?: TUpdateCourseLecture[];
};

type TAllCourse = {
    page?: number,
    limit?: number,
    search?: string,
    status?: string
}

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

type TCreateLessonParams = {
    lecture: string,
    course: string,
    title?: string,
    order?: number,
    path?: string,
    slug?: string
}

type TUpdateCourseLecture = {
    _id: string;
    title: string;
    lessons: ILesson[];
};

type TUpdateLessonParams = {
    lessonId: string,
    updateData: Partial<ILesson>,
    path?: string,
}

type TCreateHistoryParams = {
    course: string,
    lesson: string,
    checked: boolean | string,
    path: string,

}

type TCreateOrderParams = {
    code: string,
    course: string,
    user: string,
    total?: number,
    amount?: number,
    discount?: number,
    coupon?: string,
}

type TCreateCouponParams = {
    title: string;
    code: string;
    type: ECouponType;
    value?: number;
    start_date?: Date;
    end_date?: Date;
    active?: boolean;
    limit?: number;
    courses?: string[];
    path?: string;
}

type TUpdateCouponParams = {
    _id: string,
    updateData: Partial<TCreateCouponParams>,
    path?: string
}

type TCouponParams = Omit<ICoupon, "courses"> & {
    courses: {
        _id: string;
        title: string;
    }[];
};

export {
    TActiveLinkProps, TMenuItems, TUserParams,
    TCourseParams, TCourseUpdateParams, TCreateLectureParams,
    TUpdateLectureParams, TUpdateCourseParams, TCreateLessonParams,
    TUpdateCourseLecture, TUpdateLessonParams, TCreateHistoryParams, TAllCourse,
    TCreateOrderParams, TCreateCouponParams, TUpdateCouponParams, TCouponParams
}