import { type NextRequest } from 'next/server';
import { verifyPassword, setAuthCookie, clearAuthCookie, isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (!password || !verifyPassword(password)) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  await setAuthCookie();
  return Response.json({ success: true });
}

export async function DELETE() {
  await clearAuthCookie();
  return Response.json({ success: true });
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return Response.json({ authenticated });
}
