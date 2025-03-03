import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// import axios from "axios";

import { useNavigate, Outlet } from "react-router-dom";

import { FaCalculator, FaInfoCircle, FaPrint, FaTrash } from "react-icons/fa";

const Bill2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [HoveredButtonIndex, setHoveredButtonIndex] = useState();

  const [formData, setFormData] = useState({
    customerName: "",
    products: [{ name: "", quantity: 1, unitPrice: 0 }],
    sgstRate: 9,
    cgstRate: 9,
    discountType: "percentage",
    discountValue: 0,
  });

  const [errors, setErrors] = useState({});
  const [calculations, setCalculations] = useState({
    totalPrice: 0,
    gstAmount: 0,
    discountAmount: 0,
    grandTotal: 0,
  });
  const navigate = useNavigate();
  const predefinedProducts = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "Monitor",
    "Keyboard",
    "Mouse",
  ];
  const buttons = [
    "Vender",
    "Product",
    "All Product",
    "Sell",
    "All Sell",
    "Bill",
    "Logout",
  ];
  const userName = "Ayush 2";

  const handleButtonClick = (btn) => {
    if (btn === "Vender") {
      navigate("/vender");
    } else if (btn === "Product") {
      navigate("/product");
    } else if (btn === "All Product") {
      navigate("/allproduct");
    } else if (btn === "Sell") {
      navigate("/sell");
    } else if (btn === "Bill") {
      navigate("/bill");
    } else if (btn === "Logout") {
      navigate("/");
    } else if (btn === "All Sell") {
      navigate("/allsell");
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    // fetchVender();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    calculateTotals();
  }, [formData]);

  const calculateTotals = () => {
    const totalPrice = formData.products.reduce(
      (sum, product) => sum + product.quantity * product.unitPrice,
      0
    );

    const gstRate = (formData.sgstRate + formData.cgstRate) / 100;
    const gstAmount = totalPrice * gstRate;

    let discountAmount = 0;
    if (formData.discountType === "percentage") {
      discountAmount =
        (totalPrice * Math.min(formData.discountValue, 20)) / 100;
    } else {
      discountAmount = Math.min(formData.discountValue, totalPrice * 0.2);
    }

    const grandTotal = totalPrice + gstAmount - discountAmount;

    setCalculations({
      totalPrice,
      gstAmount,
      discountAmount,
      grandTotal,
    });
  };

  const handleCustomerNameChange = (e) => {
    setFormData({ ...formData, customerName: e.target.value });
    validateField("customerName", e.target.value);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "customerName":
        if (!value.trim()) {
          newErrors.customerName = "Customer name is required";
        } else {
          delete newErrors.customerName;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", { formData, calculations });
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      products: [{ name: "", quantity: 1, unitPrice: 0 }],
      sgstRate: 9,
      cgstRate: 9,
      discountType: "percentage",
      discountValue: 0,
    });
    setErrors({});
  };

  return (
    <div className="flex h-full">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white transition-all duration-300 p-4`}
      >
        <button onClick={toggleSidebar} className="mb-6">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {sidebarOpen && (
          <nav className="space-y-4">
            {buttons.map((btn, i) => (
              <a
                key={btn}
                href="#"
                className="block hover:bg-gray-700 p-2 rounded"
                onClick={() => handleButtonClick(btn)}
                onMouseEnter={() => setHoveredButtonIndex(i)}
                onMouseLeave={() => setHoveredButtonIndex(null)}
              >
                {btn}
              </a>
            ))}
          </nav>
        )}
      </div>
      <div className="min-h-screen bg-gray-50 py-0 px-0  sm:px-6 lg:px-0 flex-1 flex flex-col">
        <div className="flex justify-between items-center gap-5 md:gap-0 bg-gray-100 p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="font-semibold">Welcome, {userName}</div>
        </div>
        <div className="max-w-4xl mt-4 mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Bill Format</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Customer Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={handleCustomerNameChange}
                  placeholder="Enter Customer Name"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.customerName ? "border-red-500" : "border-gray-300"
                  } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerName}
                  </p>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Product Details
              </h2>
              {formData.products.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <select
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(index, "name", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Product</option>
                      {predefinedProducts.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="0.1"
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={product.unitPrice}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "unitPrice",
                          parseFloat(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProduct}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>

            {/* Tax Calculations */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Tax Calculations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SGST Rate (%)
                    <span className="ml-1 text-blue-600">
                      <FaInfoCircle />
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.sgstRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sgstRate: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CGST Rate (%)
                    <span className="ml-1 text-blue-600">
                      <FaInfoCircle />
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.cgstRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cgstRate: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Discount */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Discount
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      setFormData({ ...formData, discountType: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountValue: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Price:</span>
                  <span>₹{calculations.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Amount:</span>
                  <span>₹{calculations.gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>₹{calculations.discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>₹{calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <FaPrint className="mr-2" /> Print
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Generate Bill
              </button>
            </div>
          </form>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Bill2;