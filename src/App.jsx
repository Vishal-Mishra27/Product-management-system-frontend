import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BillingDashboard from "./component/Dashbord";
import Vender from "./component/Vender";
import Product from "./component/Product";
import AllProduct from "./component/AllProduct";
import Sell from "./component/Sell";
import AllSell from "./component/AllSell";
import Bill from "./component/Bill";
import Bill2 from "./component/Biil2";
import Bill3 from "./component/Bill3";
import Login from "./component/Login";
import Dashboard from "./component/Dashbord";
import ProtectedRoute from "./component/ProtectedRoute";
function App() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<BillingDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billingDashboard\" element={<BillingDashboard />} />
            <Route path="/vender" element={<Vender />} />
            <Route
              path="/vender2"
              element={
                <ProtectedRoute>
                  <Vender />
                </ProtectedRoute>
              }
            />
            <Route path="/product" element={<Product />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/allsell" element={<AllSell />} />
            <Route path="/bill" element={<Bill3 />} />
            {/* </Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

