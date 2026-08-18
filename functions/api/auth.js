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
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${secure}`;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const isProduction = url.hostname !== 'localhost' && !url.hostname.startsWith('127.0.0.1');

  // Handle logout
  if (url.pathname.endsWith('/logout')) {
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

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Thiếu thông tin đăng nhập' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify credentials
    const adminUsername = env.ADMIN_USERNAME || 'admin@byahoa.com';
    const adminPasswordHash = env.ADMIN_PASSWORD_HASH;
    const passwordHash = await hashPassword(password);

    if (username !== adminUsername || passwordHash !== adminPasswordHash) {
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

    return new Response(JSON.stringify({ success: true, user: { username, role: 'admin' } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getCookieHeader(token, COOKIE_MAX_AGE, isProduction)
      }
    });

  } catch (error) {
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
    const cookieHeader = request.headers.get('Cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...v] = c.trim().split('=');
        return [key, v.join('=')];
      })
    );

    const token = cookies[COOKIE_NAME];

    if (!token) {
      return new Response(JSON.stringify({ error: 'Chưa đăng nhập' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payload = await verify(token, env.JWT_SECRET || 'dev-secret');

    return new Response(JSON.stringify({
      success: true,
      user: { username: payload.username, role: payload.role }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Token không hợp lệ' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
