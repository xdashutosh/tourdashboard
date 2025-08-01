import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Shield,
  FileText,
  Calendar,
  Wrench,
  Activity,
  BarChart3,
  Thermometer
} from 'lucide-react';

// --- Helper Function for Dynamic Status ---
const getDocumentStatus = (dateString) => {
  if (!dateString || dateString === 'N/A') {
    return { label: 'N/A', color: 'bg-gray-100 text-gray-800', Icon: AlertTriangle };
  }
  const today = new Date();
  const expiryDate = new Date(dateString);
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: 'Expired', color: 'bg-red-100 text-red-800 border-red-300', Icon: XCircle };
  }
  if (diffDays <= 30) {
    return { label: `in ${diffDays} days`, color: 'bg-yellow-100 text-yellow-800 border-yellow-300', Icon: AlertTriangle };
  }
  return { label: 'Valid', color: 'bg-green-100 text-green-800 border-green-300', Icon: CheckCircle };
};

// --- Main Component ---
const VehicleInfo = () => {
  // More detailed and realistic mock data
  const vehicleFitnessData = [
    { id: 1, vehicleNo: "MH 01 AB 1234", insurance: "2024-12-15", rc: "2026-05-20", pollution: "2024-07-30", fitnessCert: "2025-05-20", tyreHealth: "85%", nextService: "2024-09-01" },
    { id: 2, vehicleNo: "DL 02 CD 5678", insurance: "2025-08-10", rc: "2025-12-25", pollution: "2025-03-15", fitnessCert: "2025-12-25", tyreHealth: "92%", nextService: "2024-11-15" },
    { id: 3, vehicleNo: "KA 03 EF 9012", insurance: "2026-01-20", rc: "2025-09-30", pollution: "2025-06-12", fitnessCert: "2025-09-30", tyreHealth: "78%", nextService: "2024-08-20" },
    { id: 4, vehicleNo: "TN 04 GH 3456", insurance: "2024-06-01", rc: "2025-11-15", pollution: "2024-12-08", fitnessCert: "2024-07-10", tyreHealth: "65%", nextService: "2024-07-05" },
    { id: 5, vehicleNo: "WB 05 IJ 7890", insurance: "2025-10-05", rc: "2026-02-18", pollution: "2025-01-22", fitnessCert: "2026-02-18", tyreHealth: "95%", nextService: "2025-01-10" },
    { id: 6, vehicleNo: "GJ 06 KL 1357", insurance: "2024-08-25", rc: "2027-01-01", pollution: "2024-09-15", fitnessCert: "2027-01-01", tyreHealth: "88%", nextService: "2024-10-01" },
    { id: 7, vehicleNo: "AP 07 MN 2468", insurance: "2025-04-12", rc: "2026-06-10", pollution: "2024-10-20", fitnessCert: "2026-06-10", tyreHealth: "72%", nextService: "2024-12-22" },
  ];

  const vehicleTypes = [
    { name: 'Heavy Truck', count: 35, icon: Truck, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Medium Truck', count: 28, icon: Truck, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { name: 'Light Truck', count: 27, icon: Truck, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const totalVehicles = vehicleTypes.reduce((sum, type) => sum + type.count, 0);
  const expiringSoonCount = vehicleFitnessData.flatMap(v => [v.insurance, v.rc, v.pollution, v.fitnessCert]).filter(date => getDocumentStatus(date).label.startsWith('in')).length;

  // --- Enhanced Stat Card Component ---
  const StatCard = ({ title, value, icon: Icon, bgColor, iconColor, textColor }) => (
    <Card className={`${bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${textColor || 'text-white/90'}`}>{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor || 'text-white'}`}>{value}</div>
      </CardContent>
    </Card>
  );

  // Enhanced tyre health color function
  const getTyreHealthColor = (health) => {
    const percentage = parseInt(health);
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-8">
      <div className="max-w-screen-xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Vehicle Overview
            </h2>
            <p className="text-gray-600 mt-2">Fleet status, documentation, and maintenance summary.</p>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Vehicles" 
            value={totalVehicles} 
            icon={Truck} 
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            iconColor="bg-blue-700/30"
          />
          <StatCard 
            title="Active On-Road" 
            value="60" 
            icon={Activity} 
            bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
            iconColor="bg-emerald-700/30"
          />
          <StatCard 
            title="In Maintenance" 
            value="8" 
            icon={Wrench} 
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
            iconColor="bg-orange-700/30"
          />
          <StatCard 
            title="Docs Expiring Soon" 
            value={expiringSoonCount} 
            icon={AlertTriangle} 
            bgColor="bg-gradient-to-br from-red-500 to-red-600"
            iconColor="bg-red-700/30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Enhanced Main Table: Vehicle Fitness */}
          <Card className="lg:col-span-2 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="text-blue-600 h-5 w-5" />
                </div>
                Vehicle Documentation & Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-left">
                    <tr>
                      <th className="p-4 font-semibold text-gray-700">Vehicle No</th>
                      <th className="p-4 font-semibold text-gray-700">Insurance</th>
                      <th className="p-4 font-semibold text-gray-700">RC</th>
                      <th className="p-4 font-semibold text-gray-700">Pollution</th>
                      <th className="p-4 font-semibold text-gray-700">Fitness Cert.</th>
                      <th className="p-4 font-semibold text-gray-700">Tyre Health</th>
                      <th className="p-4 font-semibold text-gray-700">Next Service</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vehicleFitnessData.map((v) => {
                      const ins = getDocumentStatus(v.insurance);
                      const rc = getDocumentStatus(v.rc);
                      const pol = getDocumentStatus(v.pollution);
                      const fit = getDocumentStatus(v.fitnessCert);
                      const service = getDocumentStatus(v.nextService);

                      return (
                        <tr key={v.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                          <td className="p-4 font-bold text-gray-900">{v.vehicleNo}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${ins.color} font-medium hover:shadow-sm transition-shadow`}>
                              <ins.Icon className="h-3 w-3 mr-1"/>{ins.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${rc.color} font-medium hover:shadow-sm transition-shadow`}>
                              <rc.Icon className="h-3 w-3 mr-1"/>{rc.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${pol.color} font-medium hover:shadow-sm transition-shadow`}>
                              <pol.Icon className="h-3 w-3 mr-1"/>{pol.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${fit.color} font-medium hover:shadow-sm transition-shadow`}>
                              <fit.Icon className="h-3 w-3 mr-1"/>{fit.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className={`flex items-center gap-2 font-semibold ${getTyreHealthColor(v.tyreHealth)}`}>
                              <Thermometer className="h-4 w-4"/>
                              {v.tyreHealth}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${service.color} font-medium hover:shadow-sm transition-shadow`}>
                              <service.Icon className="h-3 w-3 mr-1"/>{service.label}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Side Card: Vehicle Types */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="text-purple-600 h-5 w-5" />
                </div>
                Vehicle Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {vehicleTypes.map((type) => (
                <div key={type.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${type.bgColor}`}>
                      <type.icon className={`h-5 w-5 ${type.color}`} />
                    </div>
                    <span className="font-semibold text-gray-700">{type.name}</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-bold text-base px-3 py-1">
                    {type.count}
                  </Badge>
                </div>
              ))}
              <div className="border-t-2 border-gray-200 pt-4 mt-6 flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-800">Total Fleet</span>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg px-4 py-2">
                  {totalVehicles}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default VehicleInfo;