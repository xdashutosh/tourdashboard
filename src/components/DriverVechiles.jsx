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

const DriverVechiles = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-8">
      <div className="max-w-screen-xl mx-auto space-y-6">

        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Driver & Vehicle Performance
          </h2>
          <p className="text-gray-600 mt-2">
            An overview of fleet performance, costs, and revenue.
          </p>
        </div>

        {/* Enhanced Filters and Search */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Filter className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Filter by Profit:</span>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button 
                    variant="ghost"
                    size="sm" 
                    className={`${currentFilter === 'all' 
                      ? 'bg-white shadow-sm text-purple-600 hover:text-purple-700' 
                      : 'text-gray-600 hover:text-gray-800'
                    } transition-all duration-200`}
                    onClick={() => handleFilterClick('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm" 
                    className={`${currentFilter === 'top' 
                      ? 'bg-emerald-500 shadow-sm text-white hover:bg-emerald-600' 
                      : 'text-gray-600 hover:text-gray-800'
                    } transition-all duration-200`}
                    onClick={() => handleFilterClick('top')}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />Top
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm" 
                    className={`${currentFilter === 'worst' 
                      ? 'bg-red-500 shadow-sm text-white hover:bg-red-600' 
                      : 'text-gray-600 hover:text-gray-800'
                    } transition-all duration-200`}
                    onClick={() => handleFilterClick('worst')}
                  >
                    <TrendingDown className="h-4 w-4 mr-1" />Worst
                  </Button>
                </div>
              </div>

              <div className="relative w-full lg:w-auto">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 rounded">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search Driver, Vehicle, Model..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg w-full lg:w-80 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Performance Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="text-purple-600 h-5 w-5"/>
              </div>
              Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0">
                  <tr>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Driver</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Vehicle</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Status</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Total Revenue</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Net Profit</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Driver Rating</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Incidents</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Last Service</th>
                    <th scope="col" className="px-4 py-4 font-semibold text-gray-700">Fitness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                      <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                  {item.driverName.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <span className="font-semibold text-gray-900">{item.driverName}</span>
                          </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.vehicleNo}</p>
                          <p className="text-xs text-gray-500 font-medium">{item.model}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge 
                          variant="outline" 
                          className={`capitalize font-medium hover:shadow-sm transition-shadow ${
                            item.status === 'On Trip' ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100' 
                            : item.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100'
                          }`}
                        >
                            {item.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 font-bold text-emerald-700 text-base">
                        ₹{item.totalRevenue.toLocaleString('en-IN')}
                      </td>
                      <td className={`px-4 py-4 font-bold text-base ${item.netProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ₹{item.netProfit.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4">
                        <StarRating rating={item.driverRating} />
                      </td>
                       <td className="px-4 py-4">
                        <div className={`flex items-center gap-2 font-semibold ${item.incidents > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {item.incidents > 0 && <AlertTriangle className="h-4 w-4"/>}
                          <Badge className={`${item.incidents > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {item.incidents}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                            <Calendar className="h-4 w-4"/>
                            {item.lastService}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 font-semibold">
                            <ShieldCheck className={`h-4 w-4 ${parseInt(item.fitness) >= 90 ? 'text-emerald-500' : parseInt(item.fitness) >= 80 ? 'text-yellow-500' : 'text-red-500'}`}/>
                            <span className={`${parseInt(item.fitness) >= 90 ? 'text-emerald-600' : parseInt(item.fitness) >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {item.fitness}
                            </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Pagination */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-700 font-medium">
                Showing <span className="font-bold text-purple-600">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-purple-600">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> of <span className="font-bold text-purple-600">{filteredAndSortedData.length}</span> results
              </span>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Page</span>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-3 py-1">
                    {currentPage}
                  </Badge>
                  <span className="text-sm font-medium text-gray-700">of {totalPages}</span>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DriverVechiles;