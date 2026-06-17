import { ECourseLevel, ECourseStatus } from "@/types/enum";
import { Document, model } from "mongoose";
import { models, Schema } from "mongoose";

export interface ICourse extends Document<string> {
    title: string,
    image: string,
    intro_url: string,
    desc: string,
    price: number,
    sale_price: number,
    slug: string,
    status: ECourseStatus,
    created_at: Date,
    author: Schema.Types.ObjectId,
    level: ECourseLevel,
    views: number,
    rating: string[],
    info: {
        requirement: string[],
        benefit: string[],
        qa: {
            question: string,
            answer: string,
        }[]
    },
    lectures: Schema.Types.ObjectId[],
    _destroy: boolean
}

const CourseSchema = new Schema<ICourse>({
    _id: { type: String },
    title: { type: String, required: true },
    image: { type: String, default: "" },
    intro_url: { type: String, default: "" },
    desc: { type: String, default: "" },
    price: { type: Number, required: true, default: 0 },
    sale_price: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true, default: "" },
    status: { type: String, default: ECourseStatus.PENDING },
    created_at: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    level: { type: String, default: ECourseLevel.BEGINNER },
    views: { type: Number, default: 0 },
    rating: { type: [String], default: [] },
    info: {
        requirement: { type: [String], default: [] },
        benefit: { type: [String], default: [] },
        qa: {
            question: { type: String },
            answer: { type: String },
        }
    },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    _destroy: { type: Boolean, default: false },
})

const Course = models.Course || model<ICourse>("Course", CourseSchema);
export default Course;