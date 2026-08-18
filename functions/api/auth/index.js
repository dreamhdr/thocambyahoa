// Cloudflare Pages Functions - Authentication API
// POST /api/auth - Login
// Handles login requests

import { sign } from '../jwt-helper.js';

const COOKIE_NAME = 'byahoa_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function getCookieHeader(token, maxAge, isProduction) {
  const secure = isProduction ? '; Secure' : '';
  // Use SameSite=Lax for better compatibility with redirects
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const isProduction = url.hostname !== 'localhost' && !url.hostname.startsWith('127.0.0.1');

  console.log('Auth POST request (login):', url.pathname, 'isProduction:', isProduction);

  try {
    const { username, password } = await request.json();
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      console.log('Missing credentials');
      return new Response(JSON.stringify({ error: 'Thiếu thông tin đăng nhập' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify credentials
    const adminUsername = env.ADMIN_USERNAME || 'admin@byahoa.com';
    const adminPasswordHash = env.ADMIN_PASSWORD_HASH;
    const passwordHash = await hashPassword(password);

    console.log('Checking credentials...');
    console.log('Expected username:', adminUsername);
    console.log('Has password hash:', !!adminPasswordHash);

    if (username !== adminUsername || passwordHash !== adminPasswordHash) {
      console.log('Invalid credentials');
      return new Response(JSON.stringify({ error: 'Thông tin đăng nhập không chính xác' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate JWT token
    const token = await sign(
      { username, role: 'admin', exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE },
      env.JWT_SECRET || 'dev-secret'
    );

    console.log('Login successful, setting cookie');
    const cookieHeader = getCookieHeader(token, COOKIE_MAX_AGE, isProduction);
    console.log('Cookie header:', cookieHeader);

    return new Response(JSON.stringify({ success: true, user: { username, role: 'admin' } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Lỗi server: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
