import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  IndianRupee,
  TrendingUp,
  Award,
  ArrowUpDown,
  ShoppingCart
} from 'lucide-react';

const TopCustomers = () => {
  const [sortBy, setSortBy] = useState('revenue'); // 'revenue' or 'orders'

  // A single, unified data source
  const customerData = [
    { id: 1, name: "ABC Industries Ltd", location: "Mumbai", totalOrders: 145, totalRevenue: 560000, status: "Active", joinDate: "2022-01-15" },
    { id: 2, name: "Delhi Logistics Corp", location: "Delhi", totalOrders: 132, totalRevenue: 520000, status: "Active", joinDate: "2021-11-20" },
    { id: 3, name: "Chennai Express Pvt", location: "Chennai", totalOrders: 124, totalRevenue: 450000, status: "On Hold", joinDate: "2022-03-10" },
    { id: 4, name: "Bangalore Tech Solutions", location: "Bangalore", totalOrders: 118, totalRevenue: 480000, status: "Active", joinDate: "2023-02-28" },
    { id: 5, name: "Kolkata Freight Co", location: "Kolkata", totalOrders: 108, totalRevenue: 420000, status: "Active", joinDate: "2022-09-05" },
    { id: 6, name: "Pune Manufacturing Ltd", location: "Pune", totalOrders: 98, totalRevenue: 380000, status: "Active", joinDate: "2023-05-12" },
    { id: 7, name: "Hyderabad Supplies", location: "Hyderabad", totalOrders: 95, totalRevenue: 395000, status: "New", joinDate: "2024-01-20" },
  ];

  // Memoized sorting for performance
  const sortedCustomers = useMemo(() => {
    const sorted = [...customerData];
    if (sortBy === 'revenue') {
      sorted.sort((a, b) => b.totalRevenue - a.totalRevenue);
    } else if (sortBy === 'orders') {
      sorted.sort((a, b) => b.totalOrders - a.totalOrders);
    }
    return sorted;
  }, [customerData, sortBy]);
  
  const totalRevenue = customerData.reduce((sum, cust) => sum + cust.totalRevenue, 0);

  // --- Enhanced Stat Card Component ---
  const StatCard = ({ title, value, icon: Icon, subtext, bgColor, iconColor, textColor }) => (
    <Card className={`${bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${textColor || 'text-white/90'}`}>{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor || 'text-white'}`}>{value}</div>
        <p className={`text-xs ${textColor ? 'text-gray-600' : 'text-white/80'} mt-1`}>{subtext}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  mt-8">
      <div className="max-w-screen-xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customers Overview
            </h2>
            <p className="text-gray-600 mt-2">Analysis of top customers by revenue and order volume.</p>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Customers" 
            value={customerData.length} 
            icon={Users} 
            subtext="+3 this month" 
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            iconColor="bg-blue-700/30"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${(totalRevenue/100000).toFixed(2)}L`} 
            icon={IndianRupee} 
            subtext="Fiscal Year 2024" 
            bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
            iconColor="bg-emerald-700/30"
          />
          <StatCard 
            title="Avg. Revenue/Cust." 
            value={`₹${(totalRevenue/customerData.length/1000).toFixed(1)}k`} 
            icon={TrendingUp} 
            subtext="All time average" 
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
            iconColor="bg-orange-700/30"
          />
          <StatCard 
            title="Active Customers" 
            value={customerData.filter(c=>c.status==='Active').length} 
            icon={Award} 
            subtext={`${Math.round(customerData.filter(c=>c.status==='Active').length / customerData.length * 100)}% of total`}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            iconColor="bg-purple-700/30"
          />
        </div>

        {/* Enhanced Customer Leaderboard Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="text-blue-600 h-5 w-5" />
                </div>
                Customer Leaderboard
              </CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className={`${sortBy === 'revenue' 
                      ? 'bg-white shadow-sm text-blue-600 hover:text-blue-700' 
                      : 'text-gray-600 hover:text-gray-800'
                    } transition-all duration-200`}
                    onClick={() => setSortBy('revenue')}
                  >
                    <IndianRupee className="h-4 w-4 mr-2" /> Revenue
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className={`${sortBy === 'orders' 
                      ? 'bg-white shadow-sm text-blue-600 hover:text-blue-700' 
                      : 'text-gray-600 hover:text-gray-800'
                    } transition-all duration-200`}
                    onClick={() => setSortBy('orders')}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Orders
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-left">
                  <tr>
                    <th className="p-4 font-semibold text-gray-700 text-center w-16">Rank</th>
                    <th className="p-4 font-semibold text-gray-700">Customer</th>
                    <th className="p-4 font-semibold text-gray-700">Total Revenue</th>
                    <th className="p-4 font-semibold text-gray-700">Total Orders</th>
                    <th className="p-4 font-semibold text-gray-700">Status</th>
                    <th className="p-4 font-semibold text-gray-700">Member Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedCustomers.map((customer, index) => (
                    <tr key={customer.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <td className="p-4 text-center">
                        <Badge 
                          variant="secondary" 
                          className={`text-sm font-semibold ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
                            index === 2 ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900' :
                            'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800'
                          }`}
                        >
                          {index + 1}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">{customer.name}</div>
                        <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" /> {customer.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-emerald-700 text-base">
                          {customer.totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-blue-700 text-base">{customer.totalOrders}</div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={`font-medium ${
                            customer.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100' :
                            customer.status === 'On Hold' ? 'text-amber-700 bg-amber-50 border-amber-300 hover:bg-amber-100' :
                            'text-indigo-700 bg-indigo-50 border-indigo-300 hover:bg-indigo-100'
                          } transition-colors duration-200`}
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{customer.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default TopCustomers;