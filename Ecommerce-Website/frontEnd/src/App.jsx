import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./styles/component-styles/App.css";
import "./styles/component-styles/index.css"
import Home from "./pages/Home.jsx";
import Shopping from "./pages/Shopping.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Contacts from "./pages/Contacts.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import WishList from "./pages/WishList.jsx";

import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
    </>
  )
);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
