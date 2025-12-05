// client/src/pages/seller/SellerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        pendingOrders: 0
       
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/seller/dashboard-stats', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setStats(response.data);
  } catch (error) {
    toast.error('Failed to fetch dashboard stats');
    console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-6">Loading dashboard data...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Seller Dashboard Summary</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                    <p className="text-3xl font-bold">{stats.products}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold">{stats.orders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.users}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
                    <p className="text-3xl font-bold">{stats.pendingOrders}</p>
                </div>
                </div>
        </div>
    );
};

export default SellerDashboard;