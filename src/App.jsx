import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/customer/home";
import Menus from "./pages/customer/Menus";
import Cart from "./pages/customer/Cart";
import Gallery from "./pages/customer/Gallery";
import Contact from "./pages/customer/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/customer/Login.jsx";
import ProtectedRoute from "../middleware/ProtectedRoute.jsx";
import ManagerDashboard from "./pages/manager/Dashboard.jsx";
import Product from "./pages/manager/Product.jsx";
import ChefDashboard from "./pages/Chef/ChefDashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[url(/base/bg-gray-1.jpg)]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Navigate to={"/"} replace/>}/>
          <Route path="/menus" element={<Menus />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/gallery" element={<Gallery />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/login" element={<Login />}/>

          {/* MANAGER */}
          <Route path={"/manager"} element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
          />
          <Route path={"/manager/product"} element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
          />

          {/* Chef */}
          <Route path={'/chef'} element={
            <ProtectedRoute>
              <ChefDashboard />
            </ProtectedRoute>
          }
          />

          {/* 404 */}
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  );
};