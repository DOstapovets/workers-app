/* eslint-disable import/prefer-default-export */
import path from 'path';
import fs from 'fs/promises';

export class FileManager {
  constructor(public basePath: string) {}

  async uploadFile(name: string, file: Buffer): Promise<string> {
    const filePath = path.join(this.basePath, name);

    await fs.writeFile(filePath, file);

    return name;
  }
}
