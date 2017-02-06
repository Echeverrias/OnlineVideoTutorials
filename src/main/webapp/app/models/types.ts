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
};

export type File = { name: string, loadUrl: string, downloadUrl };

export type FormUser = { userName: string, password: string, userType: string, name: string, surname: string,  email: string};
