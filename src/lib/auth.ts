import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export async function createToken(payload: UserPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return null;
  }

  return verifyToken(token.value);
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function checkSubscription(userId: string): Promise<boolean> {
  // Aqui você verificaria no banco de dados se o usuário tem assinatura ativa
  // Por enquanto, retorna true para desenvolvimento
  // TODO: Implementar verificação real no banco de dados
  return true;
}
