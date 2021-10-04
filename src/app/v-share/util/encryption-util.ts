import * as CryptoJS from 'crypto-js';

export class EncryptionUtil {
  private static encodedBase64Key = 'bXVzdEJlMTZCeXRlc0tleQ==';
  public static encrypt(textToEncrypt: string): any {
    const parsedBase64Key = CryptoJS.enc.Base64.parse(this.encodedBase64Key);
    let encryptedData;

    // Encryption process
    const plaintText = textToEncrypt;
    // console.log( 'plaintText = ' + plaintText );
    // this is Base64-encoded encrypted data
    encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    // console.log('encryptedData = ' + encryptedData);
    return encryptedData;
  }

  public static decrypt(textEncrypt: string): string {
     // console.log('crypto-js', CryptoJS);
    const parsedBase64Key = CryptoJS.enc.Base64.parse(this.encodedBase64Key);

    // Decryption process
    const encryptedCipherText = textEncrypt; // or encryptedData or Text was encrypt alrady;
    const decryptedData = CryptoJS.AES.decrypt(encryptedCipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    // console.log( 'DecryptedData = ' + decryptedData );
    // this is the decrypted data as a string
    // const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    // console.log('DecryptedText = ' + decryptedText);
    return decryptedData;
  }
}
