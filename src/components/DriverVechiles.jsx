import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  User,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Star,
  ShieldCheck,
  Wrench,
  Calendar,
  AlertTriangle
} from 'lucide-react';

// Helper component for star ratings
const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))}
  </div>
);


const DriverVehicles = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'netProfit', direction: 'descending' });

  // Combined and expanded mock data
  const performanceData = [
    { id: 1, driverName: "Rajesh Kumar", driverRating: 5, vehicleNo: "MH 01 AB 1234", model: "Tata Prima", status: "On Trip", totalRevenue: 250000, driverSalary: 20000, maintenanceCost: 15000, fuelCost: 60000, incidents: 0, lastService: "2023-10-15", fitness: "95%" },
    { id: 2, driverName: "Suresh Patel", driverRating: 4, vehicleNo: "DL 02 CD 5678", model: "Ashok Leyland", status: "Available", totalRevenue: 210000, driverSalary: 22000, maintenanceCost: 18000, fuelCost: 55000, incidents: 1, lastService: "2023-09-20", fitness: "88%" },
    { id: 3, driverName: "Vikram Singh", driverRating: 5, vehicleNo: "KA 03 EF 9012", model: "Mahindra Bolero", status: "On Trip", totalRevenue: 280000, driverSalary: 24000, maintenanceCost: 12000, fuelCost: 65000, incidents: 0, lastService: "2023-11-01", fitness: "92%" },
    { id: 4, driverName: "Amit Sharma", driverRating: 3, vehicleNo: "TN 04 GH 3456", model: "Eicher Pro", status: "Maintenance", totalRevenue: 130000, driverSalary: 21000, maintenanceCost: 25000, fuelCost: 40000, incidents: 2, lastService: "2023-08-10", fitness: "85%" },
    { id: 5, driverName: "Ravi Gupta", driverRating: 4, vehicleNo: "WB 05 IJ 7890", model: "Bharat Benz", status: "Available", totalRevenue: 265000, driverSalary: 23000, maintenanceCost: 14000, fuelCost: 62000, incidents: 0, lastService: "2023-10-25", fitness: "90%" },
    { id: 6, driverName: "Manoj Tiwari", driverRating: 4, vehicleNo: "GJ 06 KL 1357", model: "Tata Prima", status: "On Trip", totalRevenue: 295000, driverSalary: 25000, maintenanceCost: 10000, fuelCost: 70000, incidents: 1, lastService: "2023-11-05", fitness: "98%" },
    { id: 7, driverName: "Sanjay Yadav", driverRating: 3, vehicleNo: "AP 07 MN 2468", model: "Eicher Pro", status: "Available", totalRevenue: 180000, driverSalary: 20000, maintenanceCost: 22000, fuelCost: 50000, incidents: 3, lastService: "2023-07-15", fitness: "82%" },
    { id: 8, driverName: "Deepak Verma", driverRating: 5, vehicleNo: "RJ 08 PQ 9753", model: "Ashok Leyland", status: "On Trip", totalRevenue: 310000, driverSalary: 26000, maintenanceCost: 11000, fuelCost: 75000, incidents: 0, lastService: "2023-10-30", fitness: "96%" },
    { id: 9, driverName: "Anil Mehra", driverRating: 2, vehicleNo: "UP 09 RS 8642", model: "Mahindra Bolero", status: "Maintenance", totalRevenue: 95000, driverSalary: 19000, maintenanceCost: 30000, fuelCost: 35000, incidents: 4, lastService: "2023-06-01", fitness: "75%" },
    { id: 10, driverName: "Sunil Jain", driverRating: 5, vehicleNo: "HR 10 TU 1928", model: "Bharat Benz", status: "Available", totalRevenue: 275000, driverSalary: 24000, maintenanceCost: 13000, fuelCost: 68000, incidents: 0, lastService: "2023-11-10", fitness: "94%" },
  ].map(item => ({
      ...item,
      netProfit: item.totalRevenue - item.driverSalary - item.maintenanceCost - item.fuelCost
  }));

  const itemsPerPage = 8;

  const filteredAndSortedData = useMemo(() => {
    let sortedItems = [...performanceData];

    // Main filter (Top/Worst)
    if (currentFilter === 'top') {
      sortedItems.sort((a, b) => b.netProfit - a.netProfit);
    } else if (currentFilter === 'worst') {
      sortedItems.sort((a, b) => a.netProfit - b.netProfit);
    }

    // Search filter
    if (searchTerm) {
      sortedItems = sortedItems.filter(item =>
        item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return sortedItems;
  }, [performanceData, searchTerm, currentFilter]);
  
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-screen-xl mx-auto space-y-6">

        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            Driver & Vehicle Performance
          </h2>
          <p className="text-sm text-gray-500">
            An overview of fleet performance, costs, and revenue.
          </p>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by Profit:</span>
              <div className="flex gap-2">
                <Button variant={currentFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterClick('all')}>All</Button>
                <Button variant={currentFilter === 'top' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterClick('top')} className={currentFilter === 'top' ? 'bg-green-600 hover:bg-green-700' : ''}><TrendingUp className="h-4 w-4 mr-1" />Top</Button>
                <Button variant={currentFilter === 'worst' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterClick('worst')} className={currentFilter === 'worst' ? 'bg-red-600 hover:bg-red-700' : ''}><TrendingDown className="h-4 w-4 mr-1" />Worst</Button>
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search Driver, Vehicle, Model..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Truck className="text-purple-600"/>
              Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                  <tr>
                    <th scope="col" className="px-4 py-3">Driver</th>
                    <th scope="col" className="px-4 py-3">Vehicle</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">Total Revenue</th>
                    <th scope="col" className="px-4 py-3">Net Profit</th>
                    <th scope="col" className="px-4 py-3">Driver Rating</th>
                    <th scope="col" className="px-4 py-3">Incidents</th>
                    <th scope="col" className="px-4 py-3">Last Service</th>
                    <th scope="col" className="px-4 py-3">Fitness</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                                  {item.driverName.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <span className="font-medium text-gray-900">{item.driverName}</span>
                          </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{item.vehicleNo}</p>
                          <p className="text-xs text-gray-500">{item.model}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`capitalize ${
                            item.status === 'On Trip' ? 'bg-blue-100 text-blue-800 border-blue-300' 
                            : item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-orange-100 text-orange-800 border-orange-300'
                        }`}>
                            {item.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-green-700">
                        ₹{item.totalRevenue.toLocaleString('en-IN')}
                      </td>
                      <td className={`px-4 py-3 font-bold ${item.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{item.netProfit.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <StarRating rating={item.driverRating} />
                      </td>
                       <td className="px-4 py-3">
                        <div className={`flex items-center gap-1 font-medium ${item.incidents > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                          {item.incidents > 0 && <AlertTriangle className="h-4 w-4"/>}
                          {item.incidents}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-4 w-4"/>
                            {item.lastService}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 font-medium">
                            <ShieldCheck className={`h-4 w-4 ${parseInt(item.fitness) >= 90 ? 'text-green-500' : 'text-yellow-500'}`}/>
                            {item.fitness}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Pagination */}
        <div className="flex justify-between items-center gap-4 pt-4">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> of <span className="font-semibold">{filteredAndSortedData.length}</span> results
          </span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm">Page {currentPage} of {totalPages}</span>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DriverVehicles;