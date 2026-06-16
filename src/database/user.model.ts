import { EUserRole, EUserStatus } from "@/types/enum";
import { Document, model, models, Schema } from "mongoose";

interface IUser extends Document {
    clerkId: string,
    name: string,
    username: string,
    email: string,
    avatar: string,
    courses: Schema.Types.ObjectId[],
    status: EUserStatus,
    role: EUserRole,
    created_at: Date,
}

const UserSchema = new Schema<IUser>({
    clerkId: { type: String, unique: true },
    name: { type: String, require: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    courses: { type: [Schema.Types.ObjectId], ref: "Course" },
    status: { type: String, enum: EUserStatus, default: EUserStatus.ACTIVE },
    role: { type: String, enum: EUserRole, default: EUserRole.USER },
    created_at: { type: Date, default: Date.now },
})

const User = models.User || model<IUser>("User", UserSchema);

export default User;
