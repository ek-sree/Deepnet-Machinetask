import { UploadApiResponse } from "cloudinary";
export declare const uploadImageToCloudinary: (fileBuffer: Buffer) => Promise<UploadApiResponse>;
export declare const deleteImageFromCloudinary: (imageUrl: string) => Promise<void>;
