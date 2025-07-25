import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./styles/App.css";
import "./styles/index.css";
import Home from "./pages/common/Home.jsx";
import Shopping from "./pages/customer/Shopping.jsx";
import SellerShop from "./pages/seller/SellerShop.jsx";
import CheckOut from "./pages/customer/CheckOut.jsx";
import Contacts from "./pages/common/Contacts.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WishList from "./pages/customer/WishList.jsx";
import CustomerProfile from "./pages/customer/CustomerProfile.jsx";
import SellerProfile from "./pages/seller/SellerProfile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CustomerPage from "./pages/admin/CustomerPage.jsx";
import SellerPage from "./pages/admin/SellerPage.jsx";
import ProductPage from "./pages/admin/ProductPage.jsx";
import UserEnquiry from "./pages/admin/UserEnquiry.jsx";
import BecomeASeller from "./pages/admin/BecomeASeller.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext";
import { UserAuthModalProvider } from "./context/UserAuthModalContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

import ProtectedRoute from "./components/common/ProtectRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />

      <Route
        path="/shopping"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Shopping />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sellerShop/:sellerId"
        element={
          <ProtectedRoute allowedRoles={["seller", "customer", "admin"]}>
            <SellerShop />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <WishList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/check-out"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CheckOut />
          </ProtectedRoute>
        }
      />

      <Route path="/contacts" element={<Contacts />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sellerprofile"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <SellerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CustomerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SellerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/userEnquiry"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserEnquiry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/becomeASeller"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <BecomeASeller />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <UserAuthModalProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </UserAuthModalProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
