import streamifier from 'streamifier';
import { NextResponse } from 'next/server';

import cloudinary from '../lib/cloudinaryConfig';

export default async function uploadFile(file) {
  try {
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'Lumeo' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Upload to Cloudinary failed');
  }
}
