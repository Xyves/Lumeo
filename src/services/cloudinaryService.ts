import { NextResponse } from 'next/server';
import type { UploadApiResponse } from 'cloudinary';

import cloudinary from '../lib/cloudinaryConfig';

export default async function uploadFile(file: File) {
  try {
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'Lumeo' },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult as UploadApiResponse);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Upload to Cloudinary failed');
  }
}
