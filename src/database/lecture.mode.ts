
import { model, models, Schema } from "mongoose";
import { Document } from "mongoose";

export interface ILecture extends Document<String> {
    _id: string,
    title: string,
    lesson: Schema.Types.ObjectId,
    course: Schema.Types.ObjectId,
    created_at: Date,
    _destroy: boolean,
    order: number
}

const LectureSchema = new Schema<ILecture>({
    _id: { type: String },
    title: { type: String, required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    created_at: { type: Date, default: Date.now },
    _destroy: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
})

const Lecture = models.Lecture || model<ILecture>("Lecture", LectureSchema);
export default Lecture;