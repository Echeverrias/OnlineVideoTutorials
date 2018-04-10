"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var handler_service_1 = require("./../../../../core/handler.service");
var connection_service_1 = require("./../../../../core/connection.service");
//import { IRoom } from './../../../../models/room';
// Messages to the server
var WS_MSG_ID_GET_FILES = 'getFiles';
// Messages from the server
var WS_MSG_ID_AVAILABLE_FILES = 'availableFiles';
var PdfLoaderService = (function () {
    function PdfLoaderService(handler, connection) {
        this.handler = handler;
        this.connection = connection;
        this.uploadRoomFilePath = 'upload';
        this.uploadedFileEndPoint = "uploadedFile/shared"; // stomp
        this._sizeLimit = 1000000;
        console.log('******** PdfLoaderService has been constructed');
        /*this.eeGetFiles = new EventEmitter<AccessFile[]>()
        this.handler.attach(WS_MSG_ID_AVAILABLE_FILES, this.eeGetFiles);
        this.getFilesSubscription = this.eeGetFiles.subscribe((files: AccessFile[]) => this.setFiles(files));
        this.roomFiles$ = new Subject<AccessFile[]>();
        */
    }
    PdfLoaderService.prototype.init = function (address) {
        console.log("PdfLoaderService.init(" + address + ")");
        // console.log(`FileService - this.files:`, this.files); 
        this.shippingAddress = "/" + this.uploadedFileEndPoint + "/" + address;
        this.uploadRoomFileAddress = "" + this.connection.urlServer + this.uploadRoomFilePath + "/" + address;
        console.log(this.shippingAddress);
        this.stompClient = this.connection.stompOverWsClient;
        this.subscription = this.stompClient.subscribe(this.shippingAddress, this.getOnNewRoomFileSubscription());
    };
    Object.defineProperty(PdfLoaderService.prototype, "uploadRoomFileUrl", {
        get: function () {
            return this.uploadRoomFileAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLoaderService.prototype, "sizeLimit", {
        get: function () {
            return this._sizeLimit;
        },
        enumerable: true,
        configurable: true
    });
    // stomp
    PdfLoaderService.prototype.getOnNewRoomFileSubscription = function () {
        var _this = this;
        var onMessage = function (data) {
            console.log("PdfLoaderService.onMessage: ", data);
            var file = JSON.parse(data.body);
            file.loadUrl = _this.connection.pathName + file.loadUrl;
            file.loadUrl = file.loadUrl.replace('//', '/');
            file.downloadUrl = _this.connection.pathName + file.downloadUrl;
            file.downloadUrl = file.downloadUrl.replace('//', '/');
            _this.incomingFile$.next(file);
            //this.files.push(file);
            //this.availableRoomFiles$.next(this.files);
        };
        return onMessage;
    };
    PdfLoaderService.prototype.getRoomFiles = function (roomId) {
        console.log("* PdfLoaderService.getRoomFiles");
        this.availableRoomFiles$ = new Subject_1.Subject();
        this.handler.attach(WS_MSG_ID_AVAILABLE_FILES, this.availableRoomFiles$);
        this.connection.sendWSMessage(WS_MSG_ID_GET_FILES, roomId);
        return this.availableRoomFiles$.asObservable()
            .map(function (availableFiles) {
            return availableFiles.slice(0);
        });
    };
    PdfLoaderService.prototype.getIncomingFile = function () {
        this.incomingFile$ = new Subject_1.Subject();
        return this.incomingFile$.asObservable();
    };
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
    PdfLoaderService.prototype.destroy = function () {
        //        this.getFilesSubscription.unsubscribe();
        this.subscription.unsubscribe();
        this.handler.detach(WS_MSG_ID_AVAILABLE_FILES);
    };
    return PdfLoaderService;
}());
PdfLoaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [handler_service_1.HandlerService, connection_service_1.ConnectionService])
], PdfLoaderService);
exports.PdfLoaderService = PdfLoaderService;
//# sourceMappingURL=pdfLoader.service.js.map