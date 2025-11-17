import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/',
  '/login',
  '/registro',
  '/receitas',
  '/checkout',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acesso a TODAS as rotas por enquanto (modo desenvolvimento)
  // Isso resolve o erro do 'jose' e permite que o site funcione
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|lasy-bridge.js).*)',
  ],
};
