// Cloudflare Pages Functions - Products API
// GET /api/products - List all products
// GET /api/products/:slug - Get product by slug
// POST /api/products - Create product (admin)
// PUT /api/products/:id - Update product (admin)
// DELETE /api/products/:id - Delete product (admin)

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

// GET /api/products or /api/products/:slug
export async function onRequestGet(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  try {
    // Get product by slug: /api/products/:slug
    if (pathParts.length > 2 && pathParts[2]) {
      const slug = pathParts[2];
      const product = await env.DB.prepare(
        `SELECT p.*, c.name as category_name, c.slug as category_slug
         FROM products p
         JOIN categories c ON p.category_id = c.id
         WHERE p.slug = ?`
      ).bind(slug).first();

      if (!product) {
        return new Response(JSON.stringify({ error: 'Không tìm thấy sản phẩm' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders() }
        });
      }

      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // List all products: /api/products
    const categoryId = url.searchParams.get('category_id');
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;

    if (categoryId) {
      query += ` WHERE p.category_id = ?`;
      const { results } = await env.DB.prepare(query + ' ORDER BY p.created_at DESC')
        .bind(categoryId).all();
      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    const { results } = await env.DB.prepare(query + ' ORDER BY p.created_at DESC').all();
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

// POST /api/products - Create product (admin only)
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    await verifyAuth(request, env);

    const { title, slug, category_id, description, image_url } = await request.json();

    if (!title || !slug || !category_id) {
      return new Response(JSON.stringify({ error: 'Thiếu thông tin bắt buộc' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO products (title, slug, category_id, description, image_url)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(title, slug, category_id, description, image_url).run();

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

// PUT /api/products/:id - Update product (admin only)
export async function onRequestPut(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[2];

  try {
    await verifyAuth(request, env);

    const { title, slug, category_id, description, image_url } = await request.json();

    await env.DB.prepare(
      `UPDATE products
       SET title = ?, slug = ?, category_id = ?, description = ?, image_url = ?
       WHERE id = ?`
    ).bind(title, slug, category_id, description, image_url, id).run();

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

// DELETE /api/products/:id - Delete product (admin only)
export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[2];

  try {
    await verifyAuth(request, env);

    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();

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
