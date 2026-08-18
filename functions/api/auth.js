// Cloudflare Pages Functions - Authentication API
// POST /api/auth - Login
// POST /api/auth/logout - Logout
// GET /api/auth/verify - Verify JWT token

import { sign, verify } from './jwt-helper.js';

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

  console.log('Auth POST request:', url.pathname, 'isProduction:', isProduction);

  // Handle logout
  if (url.pathname.endsWith('/logout')) {
    console.log('Logging out user');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getCookieHeader('', 0, isProduction)
      }
    });
  }

  // Handle login
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

export async function onRequestGet(context) {
  const { request, env } = context;

  // Verify token from cookie
  try {
    console.log('Auth verification request');
    const cookieHeader = request.headers.get('Cookie') || '';
    console.log('Cookie header received:', cookieHeader);

    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...v] = c.trim().split('=');
        return [key, v.join('=')];
      })
    );

    console.log('Parsed cookies:', Object.keys(cookies));
    const token = cookies[COOKIE_NAME];
    console.log('Auth token found:', !!token);

    if (!token) {
      console.log('No auth token in cookies');
      return new Response(JSON.stringify({ error: 'Chưa đăng nhập' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payload = await verify(token, env.JWT_SECRET || 'dev-secret');
    console.log('Token verified successfully for user:', payload.username);

    return new Response(JSON.stringify({
      success: true,
      user: { username: payload.username, role: payload.role }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Token verification error:', error.message);
    return new Response(JSON.stringify({ error: 'Token không hợp lệ' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
