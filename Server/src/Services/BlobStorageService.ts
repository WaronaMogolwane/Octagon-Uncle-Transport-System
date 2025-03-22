import dotenv from "dotenv";
import B2 from "backblaze-b2";
import { Buffer } from "buffer"; // Import buffer explicitly
import crypto from "crypto"; // Use Node.js crypto for SHA-1 hashing
import fetch from "node-fetch"; // For making HTTP requests

dotenv.config();

// Extract configuration values
const bucketId = process.env.OUTS_BACKBLAZE_BUCKET_ID!;
const applicationKeyId = process.env.OUTS_BACKBLAZE_APP_ID!;
const applicationKey = process.env.OUTS_BACKLAZE_APP_KEY!;

// Initialize Backblaze B2 instance
const b2 = new B2({
    applicationKeyId,
    applicationKey,
});

/**
 * Utility function for error handling
 * @param {string} context - Description of the error context
 * @param {any} error - Error object or message
 */
const handleError = (context: string, error: any): void => {
    console.error(`${context}:`, error.message || error);
    throw error;
};

/**
 * Retrieves an authorized upload URL from the Backblaze B2 service.
 * @returns {Promise<{ uploadUrl: string, authorizationToken: string }>}
 */
export async function GetUploadUrl(): Promise<{ uploadUrl: string; authorizationToken: string }> {
    try {
        await b2.authorize();
        const response = await b2.getUploadUrl({ bucketId });
        return response.data;
    } catch (error) {
        handleError("Error fetching upload URL", error);
    }
}

/**
 * Authorizes Backblaze B2 storage and retrieves storage details.
 * @returns {Promise<any>}
 */
export async function GetStorageAuth(): Promise<any> {
    try {
        const response = await b2.authorize();
        return response.data;
    } catch (error) {
        handleError("Error authorizing B2 storage", error);
    }
}

/**
 * Uploads a base64 string representation of a file to Backblaze B2.
 * @param {string} file - Base64 string of the file.
 * @param {string} fileName - Name of the file to upload.
 * @param {string} fileType - MIME type of the file (optional).
 * @returns {Promise<any>}
 */
export async function UploadFile(file: string, fileName: string, fileType: string = "b2/x-auto"): Promise<any> {
    try {
        const { uploadUrl, authorizationToken } = await GetUploadUrl();

        // Convert base64 to binary buffer
        const fileContent = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), "base64");

        // Generate SHA-1 hash for the file content
        const hash = crypto.createHash("sha1").update(fileContent).digest("hex");

        // Upload the file using Fetch API
        const response = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                "Content-Type": fileType,
                Authorization: authorizationToken,
                "X-Bz-File-Name": encodeURIComponent(fileName),
                "X-Bz-Content-Sha1": hash,
            },
            body: fileContent,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error uploading file: ${response.status} - ${errorBody}`);
        }

        return await response.json();
    } catch (error) {
        handleError("Error uploading file", error);
    }
}
