
import * as CryptoJS from 'crypto-js';

export class RsaService {
    private key: string;
    private iv: string;
    private enabled: boolean;

    constructor() {
        //Encrypt the Passwort with Base64
        this.key = CryptoJS.enc.Base64.parse("#base64Key#");
        this.iv = CryptoJS.enc.Base64.parse("#base64IV#");
        this.enabled = true;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
    encrypt(plaintext: string): string {
        let encrypted = CryptoJS.AES.encrypt(plaintext, 'secret key 123')
        return encrypted.toString();
    }

    decrypt(cypher: string): string {
        // if (!this.enabled)
        //     return cypher;
        // let buffer = Buffer.from(cypher, 'base64');
        // let plaintext = crypto.publicDecrypt(this.publicKey, buffer);
        let decrypted = CryptoJS.AES.decrypt(cypher, 'secret key 123')
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
    encryptObject(obj: object): any {
        return CryptoJS.AES.encrypt(JSON.stringify(obj), 'secret key 123')
    }
    decryptObject(cypher: object): any {
        var bytes = CryptoJS.AES.decrypt(cypher.toString(), 'secret key 123');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

}