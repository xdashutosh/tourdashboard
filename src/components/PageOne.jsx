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
  UserCheck
} from 'lucide-react';

const PageOne = () => {
  // Mock data for trips overview (monthly)
  const tripsData = [
    { date: '1', completed: 25, active: 15, delay: 8, incident: 2 },
    { date: '3', completed: 35, active: 12, delay: 5, incident: 1 },
    { date: '5', completed: 45, active: 18, delay: 7, incident: 3 },
    { date: '8', completed: 40, active: 20, delay: 6, incident: 1 },
    { date: '9', completed: 38, active: 16, delay: 4, incident: 2 },
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Trucks</p>
                  <p className="text-4xl font-bold mt-2">53</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Truck className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Customers</p>
                  <p className="text-4xl font-bold mt-2">550</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">No of Trips</p>
                  <p className="text-4xl font-bold mt-2">620</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Staff</p>
                  <p className="text-4xl font-bold mt-2">60</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Trips Overview Chart */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Trips overview / monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tripsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={true}
                      tickLine={true}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 60]}
                      axisLine={true}
                      tickLine={true}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Completed Trip"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Active Trip"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="delay" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      name="Delay"
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="incident" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      name="Incident"
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue and Expenditure Chart */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Revenue and expenditure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={true}
                      tickLine={true}
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Days', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      domain={[0, 90000]}
                      axisLine={true}
                      tickLine={true}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Green line (Revenue)"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenditure" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      name="Red line (Expenditure)"
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Net Profit This month</p>
                  <p className="text-2xl font-bold mt-2">₹25,00,000</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm font-medium">Total Sales</p>
                  <p className="text-2xl font-bold mt-2">₹67,00,000</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold mt-2">₹3,29,00,000</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm font-medium">Total Expenditure</p>
                  <p className="text-2xl font-bold mt-2">₹2,16,00,000</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-white" />
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