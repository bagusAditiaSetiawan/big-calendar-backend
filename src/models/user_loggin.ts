import { Schema, model, Types } from 'mongoose';

export interface IUserLogin {
    user: Types.ObjectId;
    token: string;
    status: string;
    timestamp: Date;
}

const userLoginSchema = new Schema<IUserLogin>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

userLoginSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        ret['id'] = ret['_id'];
        delete ret['_id']
        delete ret['__v']
        return ret
    }
})

export const UserLogin = model<IUserLogin>('UserLogin', userLoginSchema);