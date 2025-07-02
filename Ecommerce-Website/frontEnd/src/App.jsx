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
import CheckOut from "./pages/customer/CheckOut.jsx";
import Contacts from "./pages/common/Contacts.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WishList from "./pages/customer/WishList.jsx";
import CustomerProfile from "./pages/customer/CustomerProfile.jsx";
import SellerProfile from "./pages/seller/SellerProfile.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext";
import { UserAuthModalProvider } from "./context/UserAuthModalContext.jsx";
import ProtectedRoute from "./components/common/ProtectRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />

      <Route
        path="/shopping"
        element={
          <ProtectedRoute allowedRoles={["customer", "seller"]}>
            <Shopping />
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

      <Route
        path="/contacts"
        element={
          <ProtectedRoute allowedRoles={["customer", "seller"]}>
            <Contacts />
          </ProtectedRoute>
        }
      />

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

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <UserAuthModalProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserAuthModalProvider>
    </AuthProvider>
  );
}

export default App;
