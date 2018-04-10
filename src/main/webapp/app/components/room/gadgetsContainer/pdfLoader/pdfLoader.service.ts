import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { HandlerService } from './../../../../core/handler.service';
import { ConnectionService } from './../../../../core/connection.service';

import { WSMessage, AccessFile } from './../../../../models/types';
//import { IRoom } from './../../../../models/room';


// Messages to the server
const WS_MSG_ID_GET_FILES: string = 'getFiles';

// Messages from the server
const WS_MSG_ID_AVAILABLE_FILES: string = 'availableFiles';

@Injectable()
export class PdfLoaderService {
   
    private uploadRoomFilePath: string = 'upload';
    private uploadedFileEndPoint: string = `uploadedFile/shared`; // stomp

    private stompClient: any;
    private subscription: any; 
    private shippingAddress: string; 
    private uploadRoomFileAddress: string;

    private _sizeLimit: number = 1000000;

   // private files: AccessFile[];

   // private eeGetFiles: EventEmitter<AccessFile[]>;
   // private getFilesSubscription: any;
    private availableRoomFiles$: Subject<AccessFile[]>;
    private incomingFile$: Subject<AccessFile>;

    constructor(private handler: HandlerService, private connection: ConnectionService){
         console.log('******** PdfLoaderService has been constructed');   
         
         /*this.eeGetFiles = new EventEmitter<AccessFile[]>()
         this.handler.attach(WS_MSG_ID_AVAILABLE_FILES, this.eeGetFiles);
         this.getFilesSubscription = this.eeGetFiles.subscribe((files: AccessFile[]) => this.setFiles(files));
         this.roomFiles$ = new Subject<AccessFile[]>();
         */
    }

    init(address: string): void {
        console.log(`PdfLoaderService.init(${address})`); 
       // console.log(`FileService - this.files:`, this.files); 
        this.shippingAddress = `/${this.uploadedFileEndPoint}/${address}`;
        this.uploadRoomFileAddress = `${this.connection.urlServer}${this.uploadRoomFilePath}/${address}`;
        console.log(this.shippingAddress);
        this.stompClient = this.connection.stompOverWsClient;
        this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnNewRoomFileSubscription());
    }

    public get uploadRoomFileUrl(): string{
        return this.uploadRoomFileAddress;
    }

    public get sizeLimit(): number{
        return this._sizeLimit; 
      }

    // stomp
    private getOnNewRoomFileSubscription(): any{
        let onMessage = (data: any) => {
            console.log("PdfLoaderService.onMessage: ",data);
            let file: AccessFile = JSON.parse(data.body);
            file.loadUrl = this.connection.pathName + file.loadUrl;
            file.loadUrl = file.loadUrl.replace('//', '/');
            file.downloadUrl = this.connection.pathName + file.downloadUrl;
            file.downloadUrl = file.downloadUrl.replace('//', '/');
            this.incomingFile$.next(file);
            //this.files.push(file);
            //this.availableRoomFiles$.next(this.files);
         }

        return onMessage;
    }

    getRoomFiles(roomId: string): Observable<AccessFile[]>{
        console.log(`* PdfLoaderService.getRoomFiles`);
    
        this.availableRoomFiles$ = new Subject<AccessFile[]>();
        this.handler.attach(WS_MSG_ID_AVAILABLE_FILES, this.availableRoomFiles$);
        this.connection.sendWSMessage(WS_MSG_ID_GET_FILES, roomId);
        return this.availableRoomFiles$.asObservable()
        .map((availableFiles: AccessFile[]): AccessFile[] => {
            return availableFiles.slice(0);
        })
        
   }

    getIncomingFile(): Observable<AccessFile> {
        this.incomingFile$ = new Subject<AccessFile>(); 
        return this.incomingFile$.asObservable();
   }
/*
    getFiles(roomId: string): Observable<AccessFile[]>{
        console.log(`******  PdfLoaderService.getExistingFiles(${roomId})`);
        this.connection.sendWSMessage(WS_MSG_ID_GET_FILES, roomId);
        return this.roomFiles$.asObservable();;
    }

    setFiles(files: AccessFile[]){
        console.log("Files of the room:");
        console.log(files);
        this.roomFiles$.next(files);
    }
*/
    destroy(){
    //        this.getFilesSubscription.unsubscribe();
        this.subscription.unsubscribe();
        this.handler.detach(WS_MSG_ID_AVAILABLE_FILES);
   }


}