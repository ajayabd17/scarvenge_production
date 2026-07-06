import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider }    from './context/ThemeContext';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider }    from './context/ToastContext';
import { Navbar }           from './components/Navbar/Navbar';
import { Footer }           from './components/Footer/Footer';
import { AnnouncementBar }  from './components/AnnouncementBar/AnnouncementBar';
import { CartDrawer }       from './components/SideDrawer/SideDrawer';
import { ToastContainer }   from './components/Toast/Toast';

// Pages
import Home           from './pages/Home';
import Collections    from './pages/Collections';
import Category       from './pages/Category';
import PLP            from './pages/PLP';
import PDP            from './pages/PDP';
import BrandStory     from './pages/BrandStory';
import About          from './pages/About';
import FAQ            from './pages/FAQ';
import SizeGuide      from './pages/SizeGuide';
import Care           from './pages/Care';
import Shipping       from './pages/Shipping';
import Returns        from './pages/Returns';
import Privacy        from './pages/Privacy';
import Terms          from './pages/Terms';
import Contact        from './pages/Contact';
import Wishlist       from './pages/Wishlist';
import SearchResults  from './pages/SearchResults';
import NotFound       from './pages/NotFound';
import ComingSoon     from './pages/ComingSoon';
import Account        from './pages/Account';
import Cart           from './pages/Cart';
import Checkout       from './pages/Checkout';
import OrderSuccess   from './pages/OrderSuccess';
import TrackOrder     from './pages/TrackOrder';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

// Layout with nav/footer
function Layout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="navbar-spacer" />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </>
  );
}

// Minimal layout (checkout, coming-soon)
function MinimalLayout({ children }) {
  return (
    <>
      {children}
      <CartDrawer />
      <ToastContainer />
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Standalone pages — no nav/footer */}
        <Route path="/coming-soon" element={<MinimalLayout><ComingSoon /></MinimalLayout>} />
        <Route path="/checkout"    element={<MinimalLayout><Checkout /></MinimalLayout>} />

        {/* All other pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/collections/:slug"  element={<Layout><Collections /></Layout>} />
        <Route path="/category/:slug"     element={<Layout><Category /></Layout>} />
        <Route path="/products"           element={<Layout><PLP /></Layout>} />
        <Route path="/products/:slug"     element={<Layout><PDP /></Layout>} />
        <Route path="/our-story"          element={<Layout><BrandStory /></Layout>} />
        <Route path="/about"              element={<Layout><About /></Layout>} />
        <Route path="/faq"                element={<Layout><FAQ /></Layout>} />
        <Route path="/size-guide"         element={<Layout><SizeGuide /></Layout>} />
        <Route path="/care"               element={<Layout><Care /></Layout>} />
        <Route path="/shipping"           element={<Layout><Shipping /></Layout>} />
        <Route path="/returns"            element={<Layout><Returns /></Layout>} />
        <Route path="/privacy"            element={<Layout><Privacy /></Layout>} />
        <Route path="/terms"              element={<Layout><Terms /></Layout>} />
        <Route path="/contact"            element={<Layout><Contact /></Layout>} />
        <Route path="/wishlist"           element={<Layout><Wishlist /></Layout>} />
        <Route path="/search"             element={<Layout><SearchResults /></Layout>} />
        <Route path="/account"            element={<Layout><Account /></Layout>} />
        <Route path="/cart"               element={<Layout><Cart /></Layout>} />
        <Route path="/order-success"      element={<Layout><OrderSuccess /></Layout>} />
        <Route path="/track-order"        element={<Layout><TrackOrder /></Layout>} />
        <Route path="*"                   element={<Layout><NotFound /></Layout>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <AppRoutes />
            </BrowserRouter>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
