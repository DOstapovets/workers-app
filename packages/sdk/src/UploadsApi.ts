import type { Upload } from 'app-types';
import BaseApi from './BaseApi';

export default class UploadApi extends BaseApi {
  getUploads(): Promise<Upload[]> {
    return this.http.get('/uploads');
  }

  getUploadById(id: string): Promise<Upload> {
    return this.http.get(`/uploads/${id}`);
  }
}
