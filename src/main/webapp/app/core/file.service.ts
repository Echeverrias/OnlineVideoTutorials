import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { AccessFile } from '../models/types';



@Injectable()
export class FileService{
    
   
    private uploadFilePath: string = 'upload';
    private downloadFilePath: string = `download`;
    private userImagePath: string = 'userImage';
   
    /*
    // private uploadedFileEndPoint: string = `uploadedFile/shared`; // stomp 
 //   private stompClient: any;
  //  private subscription: any; 
  */

  private shippingAddress: string; 
  private sharedFiles$: Subject<AccessFile>;

    private uploadFileAddress: string; 
    private uploadUserImageAddress: string; 

    //private newFileAlert: EventEmitter<string>;

    private _sizeLimit: number = 1000000;

    constructor(private http: Http, private connection: ConnectionService) {
        console.log("");
        console.log("****** new FileService");
        this.uploadUserImageAddress = `${this.connection.urlServer}${this.uploadFilePath}/${this.userImagePath}`;
        this.sharedFiles$ = new Subject<AccessFile>();
       

    }
    /*
    init(address: string): void {
        console.log(`FileService.init(${address})`); 
       // console.log(`FileService - this.files:`, this.files); 
        this.uploadFileAddress = `${this.connection.urlServer}${this.uploadFilePath}/${address}`;
        console.log(this.uploadFilePath);
        /* 
        this.shippingAddress = `/${this.uploadedFileEndPoint}/${address}`;
        console.log(this.shippingAddress);
        this.stompClient = this.connection.stompOverWsClient;
        this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnMessage());
        //
    }
*/
    public get sizeLimit(): number{
      return this._sizeLimit; 
    }
  
   

    public getUploadUserImageUrl(userName: string): string {
        return `${this.uploadUserImageAddress}/${userName}`;
    }
    /*
    public getExistingFiles(): Observable<AccessFile []>{
        // Implementar llamada al servidor para que devuelva los archivos compartidos
        let existingFiles = [];
        return Observable.of(existingFiles);
    }

    public getSharedFiles(): Subject<AccessFile>{
        return this.sharedFiles$;
    }

    private getOnMessage(): any{
        let onMessage = (data: any) => {
            console.log("FileService.onMessage: ",data);
            let file: AccessFile = JSON.parse(data.body);
            file.loadUrl = this.connection.pathName + file.loadUrl;
            file.loadUrl = file.loadUrl.replace('//', '/');
            file.downloadUrl = this.connection.pathName + file.downloadUrl;
            file.downloadUrl = file.downloadUrl.replace('//', '/');
            this.sharedFiles$.next(file);
         }

        return onMessage;
    }
   */
   private getFileName(file:string): string{
       return file;
   }     


   destroy(): void{
    //    this.subscription.unsubscribe();
    }


}
