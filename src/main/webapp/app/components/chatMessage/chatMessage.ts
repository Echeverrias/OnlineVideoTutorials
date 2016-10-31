/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


export type ChatMessage = { sender: string, message: string, date: string, color: string };

export interface IMessage {
    sender: string;
    message: string;
    date: string;
}
