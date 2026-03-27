import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchRestaurantOrders, updateOrderStatus } from "../services/shopService"; 

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import UploadReelForm from '../components/reels/UploadReelForm';
import MyReels from '../components/reels/MyReels';

const Dashboard = () => {
  const { user, token } = useAuth();
  
  // Tab State: 'orders' or 'menu'
  const [activeTab, setActiveTab] = useState("orders");
  
  // Order State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchRestaurantOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    
    if (token) {
      loadOrders();
    } else {
      setLoading(false); 
    }
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Could not update order status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Preparing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500 animate-pulse">Loading Kitchen Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Kitchen Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, <span className="font-bold text-red-500">{user?.name || "Chef"}</span></p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-4">
            <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 text-center flex items-center gap-3">
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-wide">Active Orders</p>
                <p className="text-2xl font-black text-red-600 leading-none">
                  {orders.filter(o => o.status !== 'Delivered').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "orders" 
                ? "bg-red-500 text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ReceiptLongIcon fontSize="small" /> Live Orders
          </button>
          
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "menu" 
                ? "bg-red-500 text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <VideoLibraryIcon fontSize="small" /> Manage Menu
          </button>
        </div>

        {activeTab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <LocalDiningIcon sx={{ fontSize: 60 }} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">No orders yet</h3>
                <p className="text-gray-500">When customers order your food, it will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    
                    <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                      <span className="font-mono text-sm font-bold text-gray-600">#{order._id.slice(-6).toUpperCase()}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-sm text-gray-500 mb-4">Customer: <span className="font-bold text-gray-900">{order.customerName || "Guest"}</span></p>
                      
                      <div className="space-y-3 mb-6">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="font-medium text-gray-800">
                              <span className="text-red-500 font-bold mr-2">{item.quantity}x</span> 
                              {item.dishName}
                            </span>
                            <span className="text-gray-500">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="font-bold text-gray-600">Total</span>
                        <span className="text-xl font-black text-gray-900">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                      {order.status === "Pending" && (
                        <button 
                          onClick={() => handleStatusChange(order._id, "Preparing")}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl transition flex justify-center items-center gap-2"
                        >
                          <LocalDiningIcon fontSize="small" /> Accept & Prepare
                        </button>
                      )}
                      {order.status === "Preparing" && (
                        <button 
                          onClick={() => handleStatusChange(order._id, "Delivered")}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl transition flex justify-center items-center gap-2"
                        >
                          <CheckCircleOutlineIcon fontSize="small" /> Mark Delivered
                        </button>
                      )}
                      {order.status === "Delivered" && (
                        <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-2 rounded-xl cursor-not-allowed">
                          Order Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "menu" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Upload New Dish</h2>
              <div className="max-w-xl mx-auto">
                <UploadReelForm />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Your Active Menu</h2>
              <MyReels /> 
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;