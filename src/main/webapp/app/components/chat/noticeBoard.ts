import { IMessage } from './message.ts';

export interface INoticeBoard{
    publish(message: IMessage);
}