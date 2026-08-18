// Maintenance mode middleware
const MAINTENANCE_MODE = true; // Set to false to disable maintenance mode
const MAINTENANCE_PASSWORD = '1111';
const MAINTENANCE_COOKIE = 'maintenance_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Paths that bypass maintenance mode
const BYPASS_PATHS = [
  '/api/',           // Allow API access
  '/assets/',        // Allow Vite build assets (CSS, JS, images)
];

// Bypass for common static file extensions
const STATIC_EXTENSIONS = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/i;

const MAINTENANCE_HTML = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website đang bảo trì - Bya Hoa</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #8B4513 0%, #A0826D 50%, #D2B48C 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 48px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .logo {
      font-size: 48px;
      margin-bottom: 16px;
    }

    h1 {
      color: #8B4513;
      font-size: 32px;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      font-size: 18px;
      margin-bottom: 32px;
    }

    .message {
      color: #555;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .password-form {
      margin-top: 32px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      color: #555;
      font-size: 14px;
      margin-bottom: 8px;
      text-align: left;
    }

    input[type="password"] {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }

    input[type="password"]:focus {
      outline: none;
      border-color: #8B4513;
    }

    button {
      width: 100%;
      padding: 14px 16px;
      background: #8B4513;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #A0826D;
    }

    button:active {
      transform: scale(0.98);
    }

    .error {
      color: #dc2626;
      font-size: 14px;
      margin-top: 8px;
      display: none;
    }

    .error.show {
      display: block;
    }

    .icon {
      font-size: 64px;
      margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🚧</div>
    <h1>Bya Hoa</h1>
    <p class="subtitle">Website đang bảo trì</p>

    <div class="message">
      <p>Chúng tôi đang cải thiện website để mang đến trải nghiệm tốt hơn cho bạn.</p>
      <p style="margin-top: 12px;">Vui lòng quay lại sau. Xin cảm ơn!</p>
    </div>

    <div class="password-form">
      <form id="accessForm">
        <div class="form-group">
          <label for="password">Truy cập với mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            autocomplete="off"
            required
          />
        </div>
        <button type="submit">Xác nhận</button>
        <p class="error" id="error">Mật khẩu không chính xác</p>
      </form>
    </div>
  </div>

  <script>
    const form = document.getElementById('accessForm');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMsg.classList.remove('show');

      const password = passwordInput.value;

      try {
        const response = await fetch('/api/maintenance-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (data.success) {
          // Reload page to access the site
          window.location.reload();
        } else {
          errorMsg.classList.add('show');
          passwordInput.value = '';
          passwordInput.focus();
        }
      } catch (error) {
        errorMsg.textContent = 'Đã xảy ra lỗi. Vui lòng thử lại.';
        errorMsg.classList.add('show');
      }
    });
  </script>
</body>
</html>
`;

export async function onRequest(context) {
  const { request, next } = context;

  if (!MAINTENANCE_MODE) {
    return next();
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Bypass maintenance for API routes and static assets folder
  if (BYPASS_PATHS.some(bypassPath => path.startsWith(bypassPath))) {
    return next();
  }

  // Bypass for static file extensions
  if (STATIC_EXTENSIONS.test(path)) {
    return next();
  }

  // Check if user has valid maintenance access cookie
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...v] = c.trim().split('=');
      return [key, v.join('=')];
    })
  );

  const accessToken = cookies[MAINTENANCE_COOKIE];

  if (accessToken === MAINTENANCE_PASSWORD) {
    return next();
  }

  // Show maintenance page
  return new Response(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}
