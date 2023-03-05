export interface UploadImageJobPayload {
  uploadId: string;
  originalImgUrl: string;
}

export enum JobType {
  UploadImage = 'upload-image',
}
