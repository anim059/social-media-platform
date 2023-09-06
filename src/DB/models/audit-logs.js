import mongoose from "mongoose";

const { Schema } = mongoose;


const auditSchema = new Schema(
    {
        action: {type:String},
        details: {type:String},
        timestamp: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    {
        timestamps : true
    }
)

export const auditModel = mongoose.model('auditLog', auditSchema);

