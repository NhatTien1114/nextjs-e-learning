import { ELessonType } from "@/types/enum";
import { Document, model, models, Schema } from "mongoose";

export interface ILesson extends Document<string> {
    _id: string,
    title: string,
    slug: string,
    order: number,
    lectures: Schema.Types.ObjectId[],
    course: Schema.Types.ObjectId,
    type: ELessonType,
    _destroy: boolean,
    created_at: Date,
    duration: number,
    video_url: string,
    content: string
}

const LessonSchema = new Schema<ILesson>({
    _id: { type: String },
    title: { type: String, required: true },
    slug: { type: String },
    order: { type: Number, default: 0 },
    lectures: { type: [String], default: [] },
    course: { type: String, required: true },
    type: { type: String, default: ELessonType.VIDEO },
    _destroy: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    duration: { type: Number, default: 0 },
    video_url: { type: String },
    content: { type: String },
})

const Lesson = models.Lesson || model<ILesson>("Lesson", LessonSchema);
export default Lesson;