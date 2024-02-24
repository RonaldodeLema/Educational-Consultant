import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    msgContent: {
        type: String,
        require: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    sendAt: {
        type: Date,
        require: true
    }
});

const MessageBase = model('Message', messageSchema);

export default MessageBase;
