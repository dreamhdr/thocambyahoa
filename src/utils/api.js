// API Client utility functions

const API_BASE = '/api';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Auth API
export const authAPI = {
  login: (username, password) =>
    apiRequest('/auth', {
      method: 'POST',
      body: { username, password },
    }),

  logout: () =>
    apiRequest('/auth/logout', { method: 'POST' }),

  verify: () =>
    apiRequest('/auth/verify'),
};

// Products API
export const productsAPI = {
  getAll: (categoryId) => {
    const query = categoryId ? `?category_id=${categoryId}` : '';
    return apiRequest(`/products${query}`);
  },

  getBySlug: (slug) =>
    apiRequest(`/products/${slug}`),

  create: (data) =>
    apiRequest('/products', {
      method: 'POST',
      body: data,
    }),

  update: (id, data) =>
    apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id) =>
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Blogs API
export const blogsAPI = {
  getAll: (limit) => {
    const query = limit ? `?limit=${limit}` : '';
    return apiRequest(`/blogs${query}`);
  },

  getBySlug: (slug) =>
    apiRequest(`/blogs/${slug}`),

  create: (data) =>
    apiRequest('/blogs', {
      method: 'POST',
      body: data,
    }),

  update: (id, data) =>
    apiRequest(`/blogs/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id) =>
    apiRequest(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest('/categories'),
};

// Upload API
export const uploadAPI = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    return data;
  },
};
