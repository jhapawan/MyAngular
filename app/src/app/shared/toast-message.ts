import { ToasterService, ToasterConfig, Toast } from "../../../node_modules/angular2-toaster";


export class ToastMessage {
    public toastConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right',
        animation: 'fade'
    });
    constructor(private toasterService: ToasterService) {

    }

    popError(title: string, message: string, showCloseButton: boolean) {
        var toast: Toast = {
            type: 'error',
            title: title,
            body: message,
            showCloseButton:showCloseButton
        };
        this.toasterService.pop(toast);
    }


    popInfo(title: string, message: string, showCloseButton: boolean) {
        var toast: Toast = {
            type: 'infor',
            title: title,
            body: message,
            showCloseButton:showCloseButton
        };
        this.toasterService.pop(toast);
    }

    
    popSuccess(title: string, message: string, showCloseButton: boolean) {
        var toast: Toast = {
            type: 'success',
            title: title,
            body: message,
            showCloseButton:showCloseButton
        };
        this.toasterService.pop(toast);
    }



}