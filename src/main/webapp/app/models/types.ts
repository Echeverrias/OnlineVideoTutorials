/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */



export type ChatMessage = { sender: string, message: string, date: string, color: string };

export interface IMessage {
    sender: string;
    message: string;
    date: string;
};

export type File = { name: string, loadUrl: string, downloadUrl };

export type FormUser = { userName: string, password: string, userType: string, name: string, surname: string,  email: string};

export type UserInfo = { userName: string, userType: string, name: string, surname: string, email: string, roomName: string };

export type UserFile = { name: string, extension: string, mimeType: string, content: any};

export type FieldValidationRequest = { field: string, value: string, userName: string };

export type IdMessage = { id: string };
export type Message = IdMessage & Object;
export type UserInfoMessage = IdMessage & UserInfo;