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
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var connection_service_1 = require("./connection.service");
var FileService = (function () {
    function FileService(http, connection) {
        this.http = http;
        this.connection = connection;
        this.uploadFilePath = 'upload';
        this.downloadFilePath = "download";
        this.userImagePath = 'userImage';
        //private newFileAlert: EventEmitter<string>;
        this._sizeLimit = 1000000;
        console.log("");
        console.log("****** new FileService");
        this.uploadUserImageAddress = "" + this.connection.urlServer + this.uploadFilePath + "/" + this.userImagePath;
        this.sharedFiles$ = new Subject_1.Subject();
    }
    Object.defineProperty(FileService.prototype, "sizeLimit", {
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
        get: function () {
            return this._sizeLimit;
        },
        enumerable: true,
        configurable: true
    });
    FileService.prototype.getUploadUserImageUrl = function (userName) {
        return this.uploadUserImageAddress + "/" + userName;
    };
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
    FileService.prototype.getFileName = function (file) {
        return file;
    };
    FileService.prototype.destroy = function () {
        //    this.subscription.unsubscribe();
    };
    return FileService;
}());
FileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connection_service_1.ConnectionService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map