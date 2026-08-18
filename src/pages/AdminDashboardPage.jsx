import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, productsAPI, blogsAPI, categoriesAPI, uploadAPI } from '../utils/api';
import { generateSlug } from '../utils/seo';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'blogs'
  const navigate = useNavigate();

  // Products state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    category_id: '',
    description: '',
    image_url: ''
  });

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: ''
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      const data = await authAPI.verify();
      setUser(data.user);
      await fetchData();
    } catch (error) {
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, blogsData] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
        blogsAPI.getAll()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageUpload = async (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      if (formType === 'product') {
        setProductForm({ ...productForm, image_url: result.url });
      } else {
        setBlogForm({ ...blogForm, cover_image: result.url });
      }
    } catch (error) {
      alert('Upload thất bại: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Product handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, productForm);
      } else {
        await productsAPI.create(productForm);
      }
      await fetchData();
      resetProductForm();
      alert('Lưu sản phẩm thành công!');
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const handleProductEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      slug: product.slug,
      category_id: product.category_id,
      description: product.description || '',
      image_url: product.image_url || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      await productsAPI.delete(id);
      await fetchData();
      alert('Xóa sản phẩm thành công!');
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      slug: '',
      category_id: '',
      description: '',
      image_url: ''
    });
  };

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await blogsAPI.update(editingBlog.id, blogForm);
      } else {
        await blogsAPI.create(blogForm);
      }
      await fetchData();
      resetBlogForm();
      alert('Lưu bài viết thành công!');
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const handleBlogEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary || '',
      content: blog.content || '',
      cover_image: blog.cover_image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    try {
      await blogsAPI.delete(id);
      await fetchData();
      alert('Xóa bài viết thành công!');
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const resetBlogForm = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      summary: '',
      content: '',
      cover_image: ''
    });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-rustic-brown">Quản trị Bya Hoa</h1>
            <p className="text-sm text-gray-600">Xin chào, {user?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-600 hover:text-rustic-brown transition-colors">
              Về trang chủ
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-rustic-brown text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Quản lý sản phẩm
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'blogs'
                  ? 'bg-rustic-brown text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Quản lý bài viết
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'products' ? (
          <div>
            {/* Product Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">
                {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              <form onSubmit={handleProductSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tên sản phẩm *</label>
                    <input
                      type="text"
                      value={productForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setProductForm({
                          ...productForm,
                          title,
                          slug: generateSlug(title)
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug URL *</label>
                    <input
                      type="text"
                      value={productForm.slug}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Danh mục *</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                    rows="6"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Hình ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'product')}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={uploading}
                  />
                  {uploading && <p className="text-sm text-gray-600 mt-2">Đang upload...</p>}
                  {productForm.image_url && (
                    <img src={productForm.image_url} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-rustic-brown text-white px-6 py-2 rounded-lg hover:bg-rustic-wood transition-colors"
                  >
                    {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm ({products.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Hình</th>
                      <th className="text-left py-3 px-4">Tên sản phẩm</th>
                      <th className="text-left py-3 px-4">Danh mục</th>
                      <th className="text-right py-3 px-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img src={product.image_url || '/images/placeholder-product.jpg'} alt={product.title} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="py-3 px-4">{product.title}</td>
                        <td className="py-3 px-4">{product.category_name}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleProductEdit(product)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleProductDelete(product.id)}
                            className="text-red-600 hover:underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Blog Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">
                {editingBlog ? 'Sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
              <form onSubmit={handleBlogSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setBlogForm({
                          ...blogForm,
                          title,
                          slug: generateSlug(title)
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug URL *</label>
                    <input
                      type="text"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Tóm tắt</label>
                  <textarea
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rustic-brown"
                    rows="3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Nội dung</label>
                  <ReactQuill
                    theme="snow"
                    value={blogForm.content}
                    onChange={(content) => setBlogForm({ ...blogForm, content })}
                    modules={quillModules}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Ảnh bìa</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'blog')}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={uploading}
                  />
                  {uploading && <p className="text-sm text-gray-600 mt-2">Đang upload...</p>}
                  {blogForm.cover_image && (
                    <img src={blogForm.cover_image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-rustic-brown text-white px-6 py-2 rounded-lg hover:bg-rustic-wood transition-colors"
                  >
                    {editingBlog ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                  {editingBlog && (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Blogs List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Danh sách bài viết ({blogs.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Ảnh bìa</th>
                      <th className="text-left py-3 px-4">Tiêu đề</th>
                      <th className="text-left py-3 px-4">Ngày tạo</th>
                      <th className="text-right py-3 px-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map(blog => (
                      <tr key={blog.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img src={blog.cover_image || '/images/placeholder-blog.jpg'} alt={blog.title} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="py-3 px-4">{blog.title}</td>
                        <td className="py-3 px-4">{new Date(blog.created_at).toLocaleDateString('vi-VN')}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleBlogEdit(blog)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleBlogDelete(blog.id)}
                            className="text-red-600 hover:underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
