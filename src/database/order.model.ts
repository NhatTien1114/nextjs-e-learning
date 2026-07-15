import { EOrderStatus } from "@/types/enum";
import { Document, model, models, Schema } from "mongoose";

export interface IOrder extends Document<string> {
    _id: string,
    created_at: Date,
    code: string,
    course: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    total: number,
    amount: number,
    discount: number,
    coupon: Schema.Types.ObjectId,
    status: EOrderStatus
}

const OrderSchema = new Schema<IOrder>({
    code: {
        unique: true,
        type: String,
        required: true
    },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    total: {
        type: Number
    },
    amount: {
        type: Number
    }, discount: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
    },
    status: {
        type: String,
        enum: Object.values(EOrderStatus),
        default: EOrderStatus.PENDING
    }
})

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;