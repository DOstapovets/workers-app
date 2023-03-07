import type { AxiosInstance } from 'axios';
import type { Upload } from 'app-types';

export default class UploadApi {
  constructor(private http: AxiosInstance) {}

  getUploads(): Promise<Upload[]> {
    return this.http.get('/uploads');
  }

  getUploadById(id: string): Promise<Upload> {
    return this.http.get(`/uploads/${id}`);
  }
}
