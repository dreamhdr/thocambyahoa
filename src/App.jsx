import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactButtons from './components/ContactButtons';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Public Routes - With Header/Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/san-pham" element={<ProductsPage />} />
                  <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
                  <Route path="/cau-chuyen" element={<BlogsPage />} />
                  <Route path="/cau-chuyen/:slug" element={<BlogDetailPage />} />
                  <Route path="/lien-he" element={<ContactPage />} />
                </Routes>
              </main>
              <ContactButtons />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
