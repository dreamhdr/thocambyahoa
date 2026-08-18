// Cloudflare Pages Functions - Upload API
// POST /api/upload - Upload image to R2 bucket (admin only)

import { verify } from './jwt-helper.js';

const COOKIE_NAME = 'byahoa_auth';

async function verifyAuth(request, env) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...v] = c.trim().split('=');
      return [key, v.join('=')];
    })
  );

  const token = cookies[COOKIE_NAME];
  if (!token) throw new Error('Unauthorized');

  return await verify(token, env.JWT_SECRET || 'dev-secret');
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

// POST /api/upload - Upload image to R2
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    await verifyAuth(request, env);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'Không có file được upload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Chỉ chấp nhận file ảnh (JPEG, PNG, WebP)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'File quá lớn (tối đa 5MB)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${randomStr}.${extension}`;
    const key = `uploads/${filename}`;

    // Upload to R2
    await env.MEDIA_BUCKET.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type
      }
    });

    // Construct public URL
    const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;

    return new Response(JSON.stringify({
      success: true,
      url: publicUrl,
      filename: filename
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === 'Unauthorized' ? 401 : 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }
}
