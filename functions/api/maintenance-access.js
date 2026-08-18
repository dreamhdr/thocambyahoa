// Maintenance access API
const MAINTENANCE_PASSWORD = '1111';
const MAINTENANCE_COOKIE = 'maintenance_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function onRequestPost(context) {
  const { request } = context;
  const url = new URL(request.url);
  const isProduction = url.hostname !== 'localhost' && !url.hostname.startsWith('127.0.0.1');

  try {
    const { password } = await request.json();

    if (password === MAINTENANCE_PASSWORD) {
      // Set cookie to grant access
      const secure = isProduction ? '; Secure' : '';
      const cookieHeader = `${MAINTENANCE_COOKIE}=${MAINTENANCE_PASSWORD}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`;

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookieHeader
        }
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Mật khẩu không chính xác' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Lỗi server' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
