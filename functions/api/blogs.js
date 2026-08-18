// Cloudflare Pages Functions - Blogs API
// GET /api/blogs - List all blogs
// GET /api/blogs/:slug - Get blog by slug
// POST /api/blogs - Create blog (admin)
// PUT /api/blogs/:id - Update blog (admin)
// DELETE /api/blogs/:id - Delete blog (admin)

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
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

// GET /api/blogs or /api/blogs/:slug
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  try {
    // Get blog by slug: /api/blogs/:slug
    if (pathParts.length > 2 && pathParts[2]) {
      const slug = pathParts[2];
      const blog = await env.DB.prepare(
        'SELECT * FROM blogs WHERE slug = ?'
      ).bind(slug).first();

      if (!blog) {
        return new Response(JSON.stringify({ error: 'Không tìm thấy bài viết' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders() }
        });
      }

      return new Response(JSON.stringify(blog), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // List all blogs: /api/blogs
    const limit = parseInt(url.searchParams.get('limit')) || 100;
    const { results } = await env.DB.prepare(
      'SELECT * FROM blogs ORDER BY created_at DESC LIMIT ?'
    ).bind(limit).all();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }
}

// POST /api/blogs - Create blog (admin only)
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    await verifyAuth(request, env);

    const { title, slug, summary, content, cover_image } = await request.json();

    if (!title || !slug) {
      return new Response(JSON.stringify({ error: 'Thiếu thông tin bắt buộc' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO blogs (title, slug, summary, content, cover_image)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(title, slug, summary, content, cover_image).run();

    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === 'Unauthorized' ? 401 : 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }
}

// PUT /api/blogs/:id - Update blog (admin only)
export async function onRequestPut(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[2];

  try {
    await verifyAuth(request, env);

    const { title, slug, summary, content, cover_image } = await request.json();

    await env.DB.prepare(
      `UPDATE blogs
       SET title = ?, slug = ?, summary = ?, content = ?, cover_image = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(title, slug, summary, content, cover_image, id).run();

    return new Response(JSON.stringify({ success: true }), {
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

// DELETE /api/blogs/:id - Delete blog (admin only)
export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[2];

  try {
    await verifyAuth(request, env);

    await env.DB.prepare('DELETE FROM blogs WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
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
