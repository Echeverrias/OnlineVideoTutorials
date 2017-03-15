import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ConnectionService } from './connection.service';
import { File } from '../models/types';



@Injectable()
export class FileService{
    
    private uploadedFileEndPoint: string = `uploadedFile/shared`; // stomp
    private uploadFilePath: string = 'upload';
    private downloadFilePath: string = `download`;
    private userImagePath: string = 'userImage';
    
    private stompClient: any;
    private subscription: any; 
    private uploadFileAddress: string; 
    private uploadUserImageAddress: string; 
    private shippingAddress: string; 
    private files: File[];
    private filesObserver: Subject<File[]>;
    private newFileAlert: EventEmitter<string>;

    private _sizeLimit: number = 1000000;

    constructor(private http: Http, private connection: ConnectionService) {
        console.log("");
        console.log("*** new FileService");
        this.uploadFileAddress = `${this.connection.urlServer}${this.uploadFilePath}`;
        this.uploadUserImageAddress = `${this.connection.urlServer}${this.uploadFilePath}/${this.userImagePath}`;
        this.shippingAddress = `/${this.uploadedFileEndPoint}`; 
        this.filesObserver = new Subject<File[]>();
        this.files = [];
    }

    init(address: string): void {
        this.uploadFileAddress = `${this.uploadFileAddress}/${address}`;
        this.shippingAddress = `${this.shippingAddress}/${address}`;
        console.log(this.uploadFilePath);
        console.log(this.shippingAddress);
        this.stompClient = this.connection.stompOverWsClient;
        this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnMessage());
    }

    public get sizeLimit(): number{
      return this._sizeLimit; 
    }
  
    public get uploadFileUrl(): string{
      return this.uploadFileAddress;
    }

    public getUploadUserImageUrl(userName: string): string {
        return `${this.uploadUserImageAddress}/${userName}`;
    }

    public getFiles(): Subject<File[]>{
        return this.filesObserver;
    }

    private getOnMessage(): any{
        let onMessage = (data: any) => {
            console.log("FileService.onMessage: ",data);
            let file: File = JSON.parse(data.body);
            file.loadUrl = this.connection.pathName + file.loadUrl;
            file.loadUrl = file.loadUrl.replace('//', '/');
            file.downloadUrl = this.connection.pathName + file.downloadUrl;
            file.downloadUrl = file.downloadUrl.replace('//', '/');
            this.files.push(file);
            this.filesObserver.next(this.files);
         }

        return onMessage;
    }
   
   private getFileName(file:string): string{
       return file;
   }     


   destroy(): void{
        this.subscription.unsubscribe();
    }

    ///////////////////////////////////////////////////////////////////
    prueba(): string{
        return `${this.connection.urlServer}prueba`
    }

    prueba2(): string{
        return `${this.connection.urlServer}prueba2`
    }

    //////////////////////////////////////////////////////////////////

}
