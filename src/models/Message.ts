import { Schema, Types, model } from 'mongoose';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface IMessage {
  author: Types.ObjectId;
  date: Date;
  text: string;
}

const messageSchema = new Schema<IMessage>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true },
});

messageSchema.virtual('dateISO').get(function getDateISO() {
  return dayjs(this.date).toISOString();
});

messageSchema.virtual('dateString').get(function getDateString() {
  return dayjs(this.date).toString();
});

messageSchema.virtual('timeFromNow').get(function getTimeFromNow() {
  return dayjs(this.date).fromNow();
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
