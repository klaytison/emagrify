import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/',
  '/login',
  '/registro',
  '/receitas',
  '/checkout',
];

// Rotas que precisam de assinatura ativa
const protectedRoutes = [
  '/calculadora-carboidratos',
  '/quiz-perda-peso',
  '/calculadora-imc',
  '/desafios',
  '/progresso',
  '/treinamento-mental',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acesso a rotas públicas
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api/'))) {
    return NextResponse.next();
  }

  // Verificar autenticação
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // Redirecionar para login se não estiver autenticado
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Verificar token válido
  if (token) {
    const user = await verifyToken(token);
    
    if (!user) {
      // Token inválido, redirecionar para login
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(url);
      response.cookies.delete('auth-token');
      return response;
    }

    // Verificar assinatura para rotas protegidas
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      // TODO: Implementar verificação de assinatura no banco de dados
      // Por enquanto, permite acesso
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|lasy-bridge.js).*)',
  ],
};
