// Cloudflare Pages Functions - Authentication API
// POST /api/auth/logout - Logout

const COOKIE_NAME = 'byahoa_auth';

function getCookieHeader(token, maxAge, isProduction) {
  const secure = isProduction ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

export async function onRequestPost(context) {
  const { request } = context;
  const url = new URL(request.url);
  const isProduction = url.hostname !== 'localhost' && !url.hostname.startsWith('127.0.0.1');

  console.log('Logging out user');
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': getCookieHeader('', 0, isProduction)
    }
  });
}
