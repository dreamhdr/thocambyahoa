// Cloudflare Pages Functions - Authentication API
// GET /api/auth/verify - Verify JWT token

import { verify } from '../jwt-helper.js';

const COOKIE_NAME = 'byahoa_auth';

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
