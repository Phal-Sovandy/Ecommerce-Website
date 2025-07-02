import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./styles/App.css";
import "./styles/index.css";
import Home from "./pages/Home.jsx";
import Shopping from "./pages/Shopping.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Contacts from "./pages/Contacts.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WishList from "./pages/WishList.jsx";
import CustomerProfile from "./pages/CustomerProfile.jsx";
import SellerProfile from "./pages/SellerProfile.jsx";

import { CartProvider } from "./context/CartContext";
import { UserAuthModalProvider } from "./context/UserAuthModalContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>{" "}
    </>
  )
);

function App() {
  return (
    <UserAuthModalProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserAuthModalProvider>
  );
}

export default App;
