import B2 from 'backblaze-b2';
// Include fs module
var fs = require('node:fs');
import { response } from 'express';
import { buffer } from 'stream/consumers';
const bucketId = '5780427db51ccc8086d40a1f';
// All functions on the b2 instance return the response from the B2 API in the success callback
// i.e. b2.foo(...).then((b2JsonResponse) => {})

// create B2 object instance
const b2 = new B2({
    applicationKeyId: '005702d5cc064af0000000004', // or accountId: 'accountId'
    applicationKey: 'K005wovGa7ADZXygd88GkUHpfDetgH0' // or masterApplicationKeycheck dns
});

// common arguments - you can use these in any of the functions below
const common_args = {
    // axios request level config, see https://github.com/axios/axios#request-config
    axios: {
        timeout: 30000 // (example)
    },
    axiosOverride: {
        /* Don't use me unless you know what you're doing! */
    }
}
export async function GetUploadUrl(callback: (data: any) => void) {
    // get upload url
    await b2.authorize()
    b2.getUploadUrl({
        bucketId: bucketId
    })
        .then((response: any) => {
            let data: any = response.data;
            callback(data);
        })
        .catch((error: any) => {
            console.error(error)
        })
}
async function GetStorageAuth(callback: (data: any) => void) {
    await b2.authorize()
        .then((response: any) => {
            let data: any = response.data;
            callback(data);
        })
        .catch((error: any) => {
            console.error(error)
        })
}
/**
 * Uploads a base64 string representation of a file.
 * @param {string} file: string
 * @param {string} fileName: string
 * @param {string} fileType: string
 * @param {any} error:any
 * @param {any} result:any
 * @returns {any}
 */
export async function UploadFile(file: string, fileName: string, fileType: string, callback: (error: any, result: any) => {}): Promise<any> {
    await GetUploadUrl(async (data) => {
        let fileContent = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        // Create a SHA-1 hash of the content as a hex string
        const hashBuffer = await crypto.subtle.digest('SHA-1', fileContent);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        // Upload the file content with the filename, hash and auth token

        const response = await fetch(data.uploadUrl, {
            method: "POST",
            mode: "cors",
            body: fileContent,
            headers: {
                "Content-Type": "b2/x-auto",
                "Authorization": data.authorizationToken,
                "X-Bz-File-Name": fileName,
                "X-Bz-Content-Sha1": hashHex,
            },
        })
            .then(successResponse => {
                successResponse.json()
                    .then(uploadReponse => {
                        callback(null, uploadReponse);
                    });
            })
            .catch(error => {
                let msg: string, detail: any;
                // Report on the outcome
                if (error.status >= 200 && error.status < 300) {
                    msg = `${error.status} response from B2 API. Success!`;
                    callback(error.body, null);
                } else if (error.status >= 400) {
                    msg = `${error.status} error from B2 API.`;
                    callback(error.body, null);
                } else {
                    msg = `Unknown error.`;
                    callback(error.body, null);
                }
            })
    })
}
