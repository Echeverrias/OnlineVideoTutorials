/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

export type IdMessage = { id: string };
export type Message = IdMessage & Object;

export type ChatMessage = { sender: string, message: string, date: string, color: string };

export interface IMessage {
    sender: string;
    message: string;
    date: string;
}