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
// This makes the component smart and actionable.
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
    { name: 'Heavy Truck', count: 35, icon: Truck, color: 'text-blue-600' },
    { name: 'Medium Truck', count: 28, icon: Truck, color: 'text-green-600' },
    { name: 'Light Truck', count: 27, icon: Truck, color: 'text-purple-600' },
  ];

  const totalVehicles = vehicleTypes.reduce((sum, type) => sum + type.count, 0);
  const expiringSoonCount = vehicleFitnessData.flatMap(v => [v.insurance, v.rc, v.pollution, v.fitnessCert]).filter(date => getDocumentStatus(date).label.startsWith('in')).length;

  // --- Stat Card Sub-component ---
  const StatCard = ({ title, value, icon: Icon }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-screen-xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Vehicle Overview</h2>
            <p className="text-sm text-gray-500">Fleet status, documentation, and maintenance summary.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Vehicles" value={totalVehicles} icon={Truck} />
          <StatCard title="Active On-Road" value="60" icon={Activity} />
          <StatCard title="In Maintenance" value="8" icon={Wrench} />
          <StatCard title="Docs Expiring Soon" value={expiringSoonCount} icon={AlertTriangle} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Table: Vehicle Fitness */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-blue-600" />
                Vehicle Documentation & Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3 font-medium">Vehicle No</th>
                      <th className="p-3 font-medium">Insurance</th>
                      <th className="p-3 font-medium">RC</th>
                      <th className="p-3 font-medium">Pollution</th>
                      <th className="p-3 font-medium">Fitness Cert.</th>
                      <th className="p-3 font-medium">Tyre Health</th>
                      <th className="p-3 font-medium">Next Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleFitnessData.map((v) => {
                      const ins = getDocumentStatus(v.insurance);
                      const rc = getDocumentStatus(v.rc);
                      const pol = getDocumentStatus(v.pollution);
                      const fit = getDocumentStatus(v.fitnessCert);
                      const service = getDocumentStatus(v.nextService);

                      return (
                        <tr key={v.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-semibold text-gray-800">{v.vehicleNo}</td>
                          <td className="p-3"><Badge variant="outline" className={ins.color}><ins.Icon className="h-3 w-3 mr-1"/>{ins.label}</Badge></td>
                          <td className="p-3"><Badge variant="outline" className={rc.color}><rc.Icon className="h-3 w-3 mr-1"/>{rc.label}</Badge></td>
                          <td className="p-3"><Badge variant="outline" className={pol.color}><pol.Icon className="h-3 w-3 mr-1"/>{pol.label}</Badge></td>
                          <td className="p-3"><Badge variant="outline" className={fit.color}><fit.Icon className="h-3 w-3 mr-1"/>{fit.label}</Badge></td>
                          <td className="p-3"><div className="flex items-center gap-1"><Thermometer className="h-4 w-4 text-gray-400"/>{v.tyreHealth}</div></td>
                          <td className="p-3"><Badge variant="outline" className={service.color}><service.Icon className="h-3 w-3 mr-1"/>{service.label}</Badge></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Side Card: Vehicle Types */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-purple-600" />
                Vehicle Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicleTypes.map((type) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <type.icon className={`h-5 w-5 ${type.color}`} />
                    <span className="font-medium text-gray-700">{type.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{type.count}</span>
                </div>
              ))}
               <div className="border-t pt-4 mt-4 flex items-center justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-900">{totalVehicles}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default VehicleInfo;