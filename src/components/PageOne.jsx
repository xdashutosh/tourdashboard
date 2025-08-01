import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Truck, 
  Users, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Package,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Wrench,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';

const PageOne = () => {
  // Mock data for trips overview (monthly)
  const tripsData = [
    { date: '1', completed: 25, active: 15, delay: 8, incident: 2 },
    { date: '3', completed: 35, active: 12, delay: 5, incident: 1 },
    { date: '5', completed: 45, active: 18, delay: 7, incident: 3 },
    { date: '8', completed: 40, active: 20, delay: 6, incident: 1 },
    { date: '9', completed: 38, active: 16, delay: 4, incident: 2 },
    { date: '11', completed: 50, active: 22, delay: 3, incident: 1 },
    { date: '13', completed: 48, active: 19, delay: 9, incident: 4 },
    { date: '15', completed: 55, active: 24, delay: 5, incident: 2 },
  ];

  // Mock data for revenue and expenditure 
  const revenueData = [
    { day: 1, revenue: 25000, expenditure: 18000 },
    { day: 2, revenue: 32000, expenditure: 22000 },
    { day: 3, revenue: 45000, expenditure: 28000 },
    { day: 4, revenue: 52000, expenditure: 35000 },
    { day: 5, revenue: 48000, expenditure: 32000 },
    { day: 6, revenue: 58000, expenditure: 38000 },
    { day: 7, revenue: 65000, expenditure: 42000 },
    { day: 8, revenue: 72000, expenditure: 45000 },
    { day: 9, revenue: 68000, expenditure: 43000 },
    { day: 10, revenue: 75000, expenditure: 48000 },
    { day: 11, revenue: 82000, expenditure: 52000 },
    { day: 12, revenue: 78000, expenditure: 49000 },
  ];

  // Custom tooltip for trips
  const CustomTripsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{`Day ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for revenue
  const CustomRevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{`Day ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ₹${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Header */}
  

        {/* Top Stats Cards Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs font-medium">Total Trucks</p>
                  <p className="text-2xl font-bold">53</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Truck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-medium">Active Trips</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs font-medium">Delayed</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-xs font-medium">Incidents</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards Row 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs font-medium">Customers</p>
                  <p className="text-2xl font-bold">550</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-xs font-medium">Total Staff</p>
                  <p className="text-2xl font-bold">60</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-xs font-medium">In Service</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs font-medium">Completed</p>
                  <p className="text-2xl font-bold">620</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Beautiful Standalone Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Trips Overview Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Trips Overview</h3>
                <p className="text-sm text-gray-600">Monthly Performance Tracking</p>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tripsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    domain={[0, 60]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <Tooltip content={<CustomTripsTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    name="Completed"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="active" 
                    stroke="#3B82F6" 
                    strokeWidth={4}
                    name="Active"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#3B82F6', stroke: '#fff', strokeWidth: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="delay" 
                    stroke="#F59E0B" 
                    strokeWidth={4}
                    name="Delayed"
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#F59E0B', stroke: '#fff', strokeWidth: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="incident" 
                    stroke="#EF4444" 
                    strokeWidth={4}
                    name="Incidents"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#EF4444', stroke: '#fff', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Revenue Analytics</h3>
                <p className="text-sm text-gray-600">Daily Financial Tracking</p>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    domain={[0, 90000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip content={<CustomRevenueTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    name="Revenue"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenditure" 
                    stroke="#EF4444" 
                    strokeWidth={4}
                    name="Expenditure"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#EF4444', stroke: '#fff', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-medium">Net Profit</p>
                  <p className="text-lg font-bold">₹25L</p>
                  <p className="text-emerald-200 text-xs">This Month</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-xs font-medium">Total Sales</p>
                  <p className="text-lg font-bold">₹67L</p>
                  <p className="text-cyan-200 text-xs">Monthly</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-xs font-medium">Revenue</p>
                  <p className="text-lg font-bold">₹3.29Cr</p>
                  <p className="text-violet-200 text-xs">Total</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-xs font-medium">Expenditure</p>
                  <p className="text-lg font-bold">₹2.16Cr</p>
                  <p className="text-rose-200 text-xs">Total</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Operational Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-xs font-medium">Fuel Cost</p>
                  <p className="text-lg font-bold">₹18L</p>
                  <p className="text-teal-200 text-xs">Monthly</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Fuel className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-xs font-medium">Avg Delivery</p>
                  <p className="text-lg font-bold">2.4 Days</p>
                  <p className="text-amber-200 text-xs">Target: 2 Days</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-xs font-medium">Routes</p>
                  <p className="text-lg font-bold">120</p>
                  <p className="text-pink-200 text-xs">Active</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-100 text-xs font-medium">Efficiency</p>
                  <p className="text-lg font-bold">94.2%</p>
                  <p className="text-slate-200 text-xs">Fleet Avg</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default PageOne;