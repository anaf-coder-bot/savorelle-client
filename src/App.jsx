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
import Staff from "./pages/manager/Staff.jsx";
import Table from "./pages/manager/Table.jsx";
import CheckPayment from "./pages/customer/CheckPayment.jsx";
import PaymentSuccess from "./pages/customer/PaymentSuccess.jsx";
import PaymentFailed from "./pages/customer/PaymentFailed.jsx";

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
          
          <Route path="/check-payment" element={<CheckPayment />}/>
          <Route path="/payment-success/:round" element={<PaymentSuccess />}/>
          <Route path="/payment-failed/:round" element={<PaymentFailed />}/>

          {/* MANAGER */}
          <Route path={"/manager"} element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
          />
          <Route path={"/manager/product"} element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <Product />
            </ProtectedRoute>
          }
          />

          <Route path={"/manager/staff"} element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <Staff />
            </ProtectedRoute>
          }
          />

          <Route path={"/manager/table"} element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <Table />
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