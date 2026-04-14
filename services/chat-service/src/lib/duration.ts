import mm from 'music-metadata';
import { getVideoDurationInSeconds } from 'get-video-duration';
import fs from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';

export const getFileDuration = async (file: Express.Multer.File) => {
  try {
    if (file.mimetype.startsWith('audio')) {
      const metadata = await mm.parseBuffer(file.buffer, file.mimetype);

      return metadata.format.duration;
    }

    if (file.mimetype.startsWith('video')) {
      const tempName = crypto.randomBytes(8).toString('hex');
      const tempPath = path.join(os.tmpdir(), tempName);

      fs.writeFileSync(tempPath, file.buffer);

      const duration = await getVideoDurationInSeconds(tempPath);

      fs.unlinkSync(tempPath);

      return duration;
    }

    throw new Error('Unsupported file type');
  } catch (error: Error | any) {
    return error.message;
  }
};
