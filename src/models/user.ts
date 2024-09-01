import { Schema, model, Types } from 'mongoose';

export interface IUser {
    id: Types.ObjectId;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        ret['id'] = ret['_id'];
        delete ret['_id']
        delete ret['__v']
        return ret
    }
})

export const User = model<IUser>('User', userSchema);