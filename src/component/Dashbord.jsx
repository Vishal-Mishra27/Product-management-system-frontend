import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const navigate = useNavigate();
  const buttons = ['Vender', 'Product', 'All Product', 'Sell', 'All Sell', 'Bill', 'Logout'];
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500'];

  const userName = 'Ayush';

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
    } else if (btn === "Logout") {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white transition-all duration-300 p-4  ${
          window.innerWidth <= 768 ? "fixed top-0 left-0 h-full z-20" : ""
        }`}
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
      <div className="flex-1 flex flex-col overflow-x-auto max-w-full p-4 pl-[66px] sm:pl-0  md:pl-[66px] lg:pl-0">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="font-semibold">Welcome, {userName}</div>
        </div>

        {/* Dashboard Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
          {buttons.map((btn, i) => (
            <button
              key={btn}
              className={`${
                colors[i]
              } text-white py-3 rounded-xl shadow-lg transform transition text-center ${
                hoveredButtonIndex === i
                  ? "ring-4 ring-offset-2 ring-blue-400 scale-105"
                  : "hover:scale-105"
              }`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
