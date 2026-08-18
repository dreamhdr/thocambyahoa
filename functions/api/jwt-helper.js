// JWT Helper functions for Cloudflare Workers
// Simple JWT implementation using Web Crypto API

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(data) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

async function hmacSign(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncode(signature);
}

export async function sign(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerEncoded = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadEncoded = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const data = `${headerEncoded}.${payloadEncoded}`;
  const signature = await hmacSign(data, secret);
  return `${data}.${signature}`;
}

export async function verify(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [headerEncoded, payloadEncoded, signature] = parts;
  const data = `${headerEncoded}.${payloadEncoded}`;

  // Verify signature
  const expectedSignature = await hmacSign(data, secret);
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  // Decode payload
  const payloadJson = decoder.decode(base64UrlDecode(payloadEncoded));
  const payload = JSON.parse(payloadJson);

  // Check expiration
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
}
