import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  User,
  Star,
  AlertTriangle,
  Shield,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  XCircle,
  CheckCircle,
  UserCheck,
  Briefcase,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Staff = () => {
  // Mock data for drivers
  const driversData = [
    {
      id: 1,
      name: "Rajesh Kumar",
      avatar: "👨‍💼",
      rating: 4.8,
      noOfTrips: 245,
      workingYear: 8,
      delayClaims: 2,
      ruleViolations: 0,
      accidentHistory: 0,
      driverSafety: "Excellent"
    },
    {
      id: 2,
      name: "Suresh Patel", 
      avatar: "👨‍🚗",
      rating: 4.5,
      noOfTrips: 198,
      workingYear: 12,
      delayClaims: 5,
      ruleViolations: 1,
      accidentHistory: 0,
      driverSafety: "Good"
    },
    {
      id: 3,
      name: "Vikram Singh",
      avatar: "👨‍💻", 
      rating: 4.9,
      noOfTrips: 287,
      workingYear: 6,
      delayClaims: 1,
      ruleViolations: 0,
      accidentHistory: 0,
      driverSafety: "Excellent"
    },
    {
      id: 4,
      name: "Amit Sharma",
      avatar: "👨‍🔧",
      rating: 4.3,
      noOfTrips: 156,
      workingYear: 4,
      delayClaims: 3,
      ruleViolations: 2,
      accidentHistory: 1,
      driverSafety: "Fair"
    }
  ];

  // Mock data for other staff
  const otherStaffData = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "👩‍💼",
      role: "Operations Manager",
      rating: 4.7,
      experience: 5,
      department: "Operations",
      performance: "Excellent"
    },
    {
      id: 2,
      name: "Amit Gupta",
      avatar: "👨‍💻",
      role: "Fleet Coordinator", 
      rating: 4.6,
      experience: 3,
      department: "Fleet Management",
      performance: "Good"
    },
    {
      id: 3,
      name: "Neha Singh",
      avatar: "👩‍💻",
      role: "Customer Service Head",
      rating: 4.8,
      experience: 4,
      department: "Customer Relations",
      performance: "Excellent"
    },
    {
      id: 4,
      name: "Rohit Verma",
      avatar: "👨‍🔧",
      role: "Maintenance Supervisor",
      rating: 4.4,
      experience: 7,
      department: "Maintenance",
      performance: "Good"
    }
  ];

  // Create pie chart data for ratings
  const createPieData = (rating) => {
    const ratingPercentage = (rating / 5) * 100;
    return [
      { name: 'Rating', value: ratingPercentage, color: '#3B82F6' },
      { name: 'Remaining', value: 100 - ratingPercentage, color: '#E5E7EB' }
    ];
  };

  const createStaffPieData = (rating) => {
    const ratingPercentage = (rating / 5) * 100;
    return [
      { name: 'Rating', value: ratingPercentage, color: '#8B5CF6' },
      { name: 'Remaining', value: 100 - ratingPercentage, color: '#E5E7EB' }
    ];
  };

  const COLORS = ['#3B82F6', '#E5E7EB'];
  const STAFF_COLORS = ['#8B5CF6', '#E5E7EB'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page 5: Staff Overview */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Staff Overview
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card - Drivers */}
            <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <div className="p-1 bg-white/20 rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  Drivers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                
                <div className="space-y-4">
                  {driversData.map((driver, index) => (
                    <div key={driver.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      
                      {/* Driver Row Layout */}
                      <div className="flex items-center gap-4">
                        
                        {/* Driver Avatar and Basic Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-lg shadow-md">
                            {driver.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{driver.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-semibold text-yellow-600">{driver.rating}</span>
                              <span className="text-xs text-gray-500">• {driver.workingYear}yrs</span>
                            </div>
                          </div>
                        </div>

                        {/* Rating Pie Chart */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={createPieData(driver.rating)}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={12}
                                  outerRadius={28}
                                  startAngle={90}
                                  endAngle={450}
                                  dataKey="value"
                                >
                                  {createPieData(driver.rating).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="text-center mt-1">
                            <p className="text-xs text-gray-600">No of trips</p>
                            <p className="text-sm font-bold text-indigo-600">{driver.noOfTrips}</p>
                          </div>
                        </div>

                        {/* Working Year */}
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Working Year</p>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs">
                            {driver.workingYear}
                          </Badge>
                        </div>

                      </div>

                      {/* Driver Details Row */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        
                        {/* Delay Claims / Rule Violation */}
                        <div className="bg-white/70 rounded-lg p-3">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            Delay Claims / Rule Violation
                          </h4>
                          <div className="flex justify-between">
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Claims</p>
                              <Badge className={`text-xs ${driver.delayClaims === 0 ? 'bg-green-100 text-green-800' : driver.delayClaims <= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {driver.delayClaims}
                              </Badge>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Violations</p>
                              <Badge className={`text-xs ${driver.ruleViolations === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {driver.ruleViolations}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Accident History / Driver Safety */}
                        <div className="bg-white/70 rounded-lg p-3">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <Shield className="h-3 w-3 text-green-500" />
                            Accident History / Driver Safety
                          </h4>
                          <div className="flex justify-between">
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Accidents</p>
                              <Badge className={`text-xs ${driver.accidentHistory === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {driver.accidentHistory}
                              </Badge>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Safety</p>
                              <Badge className={`text-xs ${
                                driver.driverSafety === 'Excellent' ? 'bg-green-100 text-green-800' : 
                                driver.driverSafety === 'Good' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {driver.driverSafety}
                              </Badge>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>

            {/* Right Card - Other Staff */}
            <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <div className="p-1 bg-white/20 rounded-full">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  Other Staff
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                
                <div className="space-y-4">
                  {otherStaffData.map((staff, index) => (
                    <div key={staff.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      
                      {/* Staff Row Layout */}
                      <div className="flex items-center gap-4">
                        
                        {/* Staff Avatar and Basic Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-lg shadow-md">
                            {staff.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{staff.name}</h3>
                            <p className="text-xs text-purple-600 font-semibold">{staff.role}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-semibold text-yellow-600">{staff.rating}</span>
                              <span className="text-xs text-gray-500">• {staff.experience}yrs</span>
                            </div>
                          </div>
                        </div>

                        {/* Experience Badge */}
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Experience</p>
                          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs">
                            {staff.experience} yrs
                          </Badge>
                        </div>

                      </div>

                      {/* Other Staff Rating and History */}
                      <div className="bg-white/70 rounded-lg p-4 mt-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1">
                          <Award className="h-3 w-3 text-purple-500" />
                          Other Staff Rating and History
                        </h4>
                        
                        <div className="flex items-center gap-4">
                          
                          {/* Rating Pie Chart */}
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={createStaffPieData(staff.rating)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={12}
                                    outerRadius={28}
                                    startAngle={90}
                                    endAngle={450}
                                    dataKey="value"
                                  >
                                    {createStaffPieData(staff.rating).map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={STAFF_COLORS[index]} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <p className="text-xs font-bold text-purple-600 mt-1">{staff.rating}</p>
                          </div>

                          {/* Staff Details */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-3 w-3 text-purple-500" />
                              <span className="text-xs text-gray-600">Dept: {staff.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs">
                                {staff.performance}
                              </Badge>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Staff;