import { unescape } from "querystring";

export class HelperFunction {
    constructor(

    ) { }
    public convertImageUrlToBinary(url) {
        return new Blob(url, { type: 'file' });
    }

    public dataURItoBlob(url) {
        return new Promise(function (resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = function () { reject("Network error.") };
                xhr.onload = function () {
                    if (xhr.status === 200) { resolve(xhr.response) }
                    else { reject("Loading error:" + xhr.statusText) }
                };

                xhr.send();
            }
            catch (err) { reject(err.message) }
        });
    }
}