import { Document, model, models, Schema } from "mongoose";

export interface IHistory extends Document<string> {
    _id: string,
    course: Schema.Types.ObjectId,
    lesson: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    createdAt: Date
}

const HistorySchema = new Schema<IHistory>({
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
})

const History = models.History || model<IHistory>("History", HistorySchema);
export default History;