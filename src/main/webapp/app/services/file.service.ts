import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
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
    private sharedFiles$: Subject<File>;
    private newFileAlert: EventEmitter<string>;

    private _sizeLimit: number = 1000000;

    constructor(private http: Http, private connection: ConnectionService) {
        console.log("");
        console.log("****** new FileService");
        this.uploadUserImageAddress = `${this.connection.urlServer}${this.uploadFilePath}/${this.userImagePath}`;
        this.sharedFiles$ = new Subject<File>();
        this.sharedFiles$ = new Subject<File>();

    }

    init(address: string): void {
        console.log(`FileService.init(${address})`); 
       // console.log(`FileService - this.files:`, this.files); 
        this.uploadFileAddress = `${this.connection.urlServer}${this.uploadFilePath}/${address}`;
        this.shippingAddress = `/${this.uploadedFileEndPoint}/${address}`;
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
    
    public getExistingFiles(): Observable<File []>{
        // Implementar llamada al servidor para que devuelva los archivos compartidos
        let existingFiles = [];
        return Observable.of(existingFiles);
    }

    public getSharedFiles(): Subject<File>{
        return this.sharedFiles$;
    }

    private getOnMessage(): any{
        let onMessage = (data: any) => {
            console.log("FileService.onMessage: ",data);
            let file: File = JSON.parse(data.body);
            file.loadUrl = this.connection.pathName + file.loadUrl;
            file.loadUrl = file.loadUrl.replace('//', '/');
            file.downloadUrl = this.connection.pathName + file.downloadUrl;
            file.downloadUrl = file.downloadUrl.replace('//', '/');
            this.sharedFiles$.next(file);
         }

        return onMessage;
    }
   
   private getFileName(file:string): string{
       return file;
   }     


   destroy(): void{
        this.subscription.unsubscribe();
    }


}
