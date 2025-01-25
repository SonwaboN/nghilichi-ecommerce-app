import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { Toaster } from 'sonner';
    import { AuthProvider } from '@/contexts/AuthContext';
    import { RequireAuth } from '@/components/auth/RequireAuth';
    import { Navbar } from '@/components/layout/Navbar';
    import { Hero } from '@/components/home/Hero';
    import { ShopPage } from '@/pages/Shop';
    import { ProductDetail } from '@/pages/ProductDetail';
    import { CartPage } from '@/pages/Cart';
    import { ConsultationPage } from '@/pages/Consultation';
    import { BlogPage } from '@/pages/Blog';
    import { AboutMePage } from '@/pages/AboutMe';
    import { RetreatsPage } from '@/pages/Retreats';
    import { GoddessChiPadsPage } from '@/pages/GoddessChiPads';
    import { ContactPage } from '@/pages/Contact';
    import { LoginPage } from '@/pages/auth/Login';
    import { RegisterPage } from '@/pages/auth/Register';
    import { ProfilePage } from '@/pages/account/Profile';
    import { CheckoutPage } from '@/pages/checkout/Checkout';
    import { WishlistPage } from '@/pages/Wishlist';
    import { ChatButton } from '@/components/chat/ChatButton';
    import { AdminLayout } from '@/components/admin/layout/AdminLayout';
    import { Dashboard as AdminDashboard } from '@/pages/admin/Dashboard';
    import { Orders as AdminOrders } from '@/pages/admin/Orders';
    import { Inventory as AdminInventory } from '@/pages/admin/Inventory';
    import { OrderDetailsPage as AdminOrderDetails } from '@/pages/admin/OrderDetails';
    import { ProductDetails as AdminProductDetails } from '@/pages/admin/ProductDetails';
    import { ProductForm as AdminProductForm } from '@/pages/admin/ProductForm';

    function App() {
      return (
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-[#EBEBDA]">
              <Navbar />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/goddess-chi-pads" element={<GoddessChiPadsPage />} />
                <Route path="/retreats" element={<RetreatsPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route 
                  path="/checkout" 
                  element={
                    <RequireAuth>
                      <CheckoutPage />
                    </RequireAuth>
                  } 
                />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about-me" element={<AboutMePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/wishlist" 
                  element={
                    <RequireAuth>
                      <WishlistPage />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/account/*" 
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  } 
                />
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <AdminLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:id" element={<AdminOrderDetails />} />
                  <Route path="inventory" element={<AdminInventory />} />
                  <Route path="inventory/new" element={<AdminProductForm />} />
                  <Route path="inventory/:id" element={<AdminProductDetails />} />
                </Route>
              </Routes>
              <ChatButton />
              <Toaster position="top-center" />
            </div>
          </Router>
        </AuthProvider>
      );
    }

    export default App;
