import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response("Plz don't be a btoa.", { status: 403 });
  }
  if (!req.url.includes('/api')) {
    if (!req.cookies.carrotsession && !req.url.includes('/enter')) {
      return NextResponse.redirect('/enter');
    }
  }
  // return NextResponse.json({ ok: true });
}
