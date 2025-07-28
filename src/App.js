import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomePage from "./pages/homepage/Homepage";
import Navbar from "./bookishComponents/Navbar";
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import UpdateProduct from "./pages/admin/updateProduct/updateProduct";
import AdminRoutes from "./protected_routes/AdmiRoutes";
import UserRoutes from "./protected_routes/UserRoutes";
import Profile from "./pages/user/UserDashboard";
import ProductDetails from "./pages/product_details/ProductDetails";
import { CartProvider } from "./context/CartContext";
import usePreventBackToLogin from "./hooks/PreventBackToLogin";
import PlaceOrder from "./pages/order/PlaceOrder";
import ViewOrder from "./pages/admin/admin_dashboard/viewOrder";
import UserLog from "./pages/admin/userlog/UserLog";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

const AppRoutes = () => {
  usePreventBackToLogin();
  const hideNavbar = location.pathname === "/payment/success";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/update/:id" element={<UpdateProduct />} />
          <Route path="/userlog" element={<UserLog />} />
        </Route>

        <Route element={<UserRoutes />}>
          <Route path="/Home" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
