import { type NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Generate unique filename to avoid overwrites
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `flowerist-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Upload to Vercel Blob with public access
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return Response.json({ url: blob.url }, { status: 201 });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
