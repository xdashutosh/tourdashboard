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

  // --- Reusable Stat Card Component ---
  const StatCard = ({ title, value, icon: Icon, subtext }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{subtext}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-screen-xl mx-auto space-y-6">

        {/* Page Header */}
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Customers Overview</h2>
            <p className="text-sm text-gray-500">Analysis of top customers by revenue and order volume.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Customers" value={customerData.length} icon={Users} subtext="+3 this month" />
          <StatCard title="Total Revenue" value={`₹${(totalRevenue/100000).toFixed(2)}L`} icon={IndianRupee} subtext="Fiscal Year 2024" />
          <StatCard title="Avg. Revenue/Cust." value={`₹${(totalRevenue/customerData.length/1000).toFixed(1)}k`} icon={TrendingUp} subtext="All time average" />
          <StatCard title="Active Customers" value={customerData.filter(c=>c.status==='Active').length} icon={Award} subtext={`${Math.round(customerData.filter(c=>c.status==='Active').length / customerData.length * 100)}% of total`} />
        </div>

        {/* Customer Leaderboard Card */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="text-blue-600" />
              Customer Leaderboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Sort by:</span>
              <Button size="sm" variant={sortBy === 'revenue' ? 'default' : 'outline'} onClick={() => setSortBy('revenue')}>
                <IndianRupee className="h-4 w-4 mr-2" /> Revenue
              </Button>
              <Button size="sm" variant={sortBy === 'orders' ? 'default' : 'outline'} onClick={() => setSortBy('orders')}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3 font-medium text-center w-16">Rank</th>
                    <th className="p-3 font-medium">Customer</th>
                    <th className="p-3 font-medium">Total Revenue</th>
                    <th className="p-3 font-medium">Total Orders</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Member Since</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCustomers.map((customer, index) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-center">
                        <Badge variant="secondary" className="text-base">
                          {index + 1}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-gray-800">{customer.name}</div>
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          <MapPin className="h-3 w-3" /> {customer.location}
                        </div>
                      </td>
                      <td className="p-3 font-medium text-green-700">
                        {customer.totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
                      </td>
                      <td className="p-3 font-medium text-blue-700">{customer.totalOrders}</td>
                      <td className="p-3">
                        <Badge variant="outline" className={
                          customer.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' :
                          customer.status === 'On Hold' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                          'text-purple-700 bg-purple-50 border-purple-200'
                        }>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600">{customer.joinDate}</td>
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