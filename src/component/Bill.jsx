import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { FaCalculator, FaInfoCircle, FaPrint, FaTrash } from "react-icons/fa";

const Bill = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const [getSell, setGetSell] = useState([]);
  //   const [allSellForm,setallSellForm] = useState(false);
  const navigate = useNavigate();
  const buttons = [
    "Vender",
    "Product",
    "All Product",
    "Sell",
    "All Sell",
    "Bill",
    "Logout",
  ];
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  const userName = "Ayush";

  const handleButtonClick = (btn) => {
    if (btn === "Vender") {
      navigate("/vender");
    } else if (btn === "Product") {
      navigate("/product");
    } else if (btn === "All Product") {
      navigate("/allproduct");
    } else if (btn === "Sell") {
      navigate("/sell");
    } else if (btn === "All Sell") {
      navigate("/allsell");
    } else if (btn === "Bill") {
      navigate("/bill");
    }
  };

  // fetching sell data
  const fetchSellData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/sell/api/getsellitem"
      );
      console.log(response.data.message);
      setGetSell(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    fetchSellData();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleDelete = async (id) => {
    // e.preventDefault()
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/sell/api/deletesellitem/${id}`
      );
      console.log(res);
      fetchSellData();
    } catch (error) {
      console.log(error);
    }
  };


  // -------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    sgstRate: 9,
    cgstRate: 9,
    discountType: "percentage",
    discountValue: 0
  });

  const [errors, setErrors] = useState({});
  const [calculations, setCalculations] = useState({
    totalPrice: 0,
    gstAmount: 0,
    discountAmount: 0,
    grandTotal: 0
  });

  console.log("get sell of product:", getSell);
  const predefinedproductName = [{ productName: getSell.productName }];

  useEffect(() => {
    calculateTotals();
  }, [formData]);

  const calculateTotals = () => {
    const totalPrice = formData.productName.reduce(
      (sum, product) => sum + product.quantity * product.unitPrice,
      0
    );

    const gstRate = (formData.sgstRate + formData.cgstRate) / 100;
    const gstAmount = totalPrice * gstRate;

    let discountAmount = 0;
    if (formData.discountType === "percentage") {
      discountAmount = (totalPrice * Math.min(formData.discountValue, 20)) / 100;
    } else {
      discountAmount = Math.min(formData.discountValue, totalPrice * 0.2);
    }

    const grandTotal = totalPrice + gstAmount - discountAmount;

    setCalculations({
      totalPrice,
      gstAmount,
      discountAmount,
      grandTotal
    });
  };

  const handleCustomerNameChange = (e) => {
    setFormData({ ...formData, customerName: e.target.value });
    validateField("customerName", e.target.value);
  };

  const handleProductChange = (e) => {
  setFormData({ ...formData, customerName: e.target.value });
  validateField("productName", e.target.value);
  
  };
  

  const addProduct = () => {
    setFormData({
      ...formData,
      productName: [...formData.productName, { name: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const removeProduct = (index) => {
    const updatedproductName = formData.productName.filter((_, i) => i !== index);
    setFormData({ ...formData, productName: updatedproductName });
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
      productName: [{ name: "", quantity: 1, unitPrice: 0 }],
      sgstRate: 9,
      cgstRate: 9,
      discountType: "percentage",
      discountValue: 0
    });
    setErrors({});
  };
  // -------------------------------------------------------------------------------------
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center gap-5 md:gap-0 bg-gray-100 p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="font-semibold">Welcome, {userName}</div>
        </div>

        {/*All Dashboard  */}
        <div className="p-6 flex justify-center">
          <h2 className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg font-bold text-xl transition">
            Bill
          </h2>
        </div>
        {/* ---------- */}

        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Bill Format
            </h1>

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
                  <select
                    type="string"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                    value={formData.customerName}
                    name="customerName"
                    onChange={handleCustomerNameChange}
                  >
                    {" "}
                    <option value="">Select Customer</option>
                    {getSell.map((Customer) => (
                      <option key={Customer._id} value={Customer.customerName}>
                        {Customer.customerName}
                      </option>
                    ))}
                  </select>
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
                {formData.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <select
                        type="string"
                        name="productName"
                        value={formData.productName}
                        onChange={(e) => handleProductChange()}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Product</option>
                        {getSell.map((product) => (
                          <option key={product._id} value={product.productName}>
                            {product.productName}
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
                        // value={product.unitPrice}
                        value={formData.price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "unitPrice",
                            parseFloat(e.target.value)
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                        readOnly
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
                        setFormData({
                          ...formData,
                          discountType: e.target.value,
                        })
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
        </div>

        {/* -------------------------- */}
        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Bill;
