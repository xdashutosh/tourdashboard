import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, MapPin } from 'lucide-react';

// Mock data for Indian states with customer information
const stateData = [
  { name: 'Maharashtra', customers: 15420, growth: 18.5, lat: 19.7515, lng: 75.7139, capital: 'Mumbai' },
  { name: 'Karnataka', customers: 12850, growth: 22.3, lat: 15.3173, lng: 75.7139, capital: 'Bangalore' },
  { name: 'Tamil Nadu', customers: 11200, growth: 15.7, lat: 11.1271, lng: 78.6569, capital: 'Chennai' },
  { name: 'Gujarat', customers: 9800, growth: 28.1, lat: 23.0225, lng: 72.5714, capital: 'Gandhinagar' },
  { name: 'Uttar Pradesh', customers: 8950, growth: 12.4, lat: 26.8467, lng: 80.9462, capital: 'Lucknow' },
  { name: 'West Bengal', customers: 7650, growth: 9.8, lat: 22.9868, lng: 87.8550, capital: 'Kolkata' },
  { name: 'Rajasthan', customers: 6420, growth: 31.2, lat: 27.0238, lng: 74.2179, capital: 'Jaipur' },
  { name: 'Telangana', customers: 5890, growth: 35.6, lat: 18.1124, lng: 79.0193, capital: 'Hyderabad' },
  { name: 'Kerala', customers: 4780, growth: 16.9, lat: 10.8505, lng: 76.2711, capital: 'Thiruvananthapuram' },
  { name: 'Punjab', customers: 3920, growth: -5.2, lat: 31.1471, lng: 75.3412, capital: 'Chandigarh' },
  { name: 'Haryana', customers: 3150, growth: 14.3, lat: 29.0588, lng: 76.0856, capital: 'Chandigarh' },
  { name: 'Odisha', customers: 2890, growth: 19.7, lat: 20.9517, lng: 85.0985, capital: 'Bhubaneswar' }
];

const CustomerMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedState, setSelectedState] = useState(null);

  // Color mapping for states - moved to component level for consistency
  const stateColors = [
    '#e74c3c', // Red
    '#3498db', // Blue  
    '#2ecc71', // Green
    '#f39c12', // Orange
    '#9b59b6', // Purple
    '#1abc9c', // Turquoise
    '#e67e22', // Dark Orange
    '#34495e', // Dark Blue Gray
    '#e91e63', // Pink
    '#ff5722', // Deep Orange
    '#795548', // Brown
    '#607d8b'  // Blue Gray
  ];

  const getStateColor = (index) => stateColors[index % stateColors.length];

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Add CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(cssLink);
      }

      // Load JS
      if (!window.L) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
    };

    loadLeaflet().then(() => {
      if (window.L && mapRef.current && !mapInstanceRef.current) {
        // Initialize map centered on India
        mapInstanceRef.current = window.L.map(mapRef.current).setView([20.5937, 78.9629], 5);

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);

        // Add markers for each state
        stateData.forEach((state, index) => {
          // Calculate bubble size based on customer count
          const maxCustomers = Math.max(...stateData.map(s => s.customers));
          const minRadius = 15;
          const maxRadius = 50;
          const radius = minRadius + ((state.customers / maxCustomers) * (maxRadius - minRadius));

          // Assign unique color to each state using the same function as sidebar
          const stateColor = stateColors[index % stateColors.length];

          // Create circle marker with unique color
          const marker = window.L.circleMarker([state.lat, state.lng], {
            radius: radius,
            fillColor: stateColor,
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.85
          }).addTo(mapInstanceRef.current);

          // Add popup
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${state.name}</h3>
              <p class="text-sm">Customers: ${state.customers.toLocaleString()}</p>
              <p class="text-sm">Growth: ${state.growth > 0 ? '+' : ''}${state.growth}%</p>
            </div>
          `);

          // Add click event
          marker.on('click', () => {
            setSelectedState(state);
          });

          markersRef.current.push(marker);
        });
      }
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  const totalCustomers = stateData.reduce((sum, state) => sum + state.customers, 0);
  const avgGrowth = stateData.reduce((sum, state) => sum + state.growth, 0) / stateData.length;

  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="flex h-[80vh] bg-gray-50 mt-8">
      {/* Map Section */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          
        </div>
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Statistics Panel */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            State-wise Analytics
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold">{formatNumber(totalCustomers)}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Growth</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      {avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)}%
                      {avgGrowth > 0 ? 
                        <TrendingUp className="h-4 w-4 text-green-500" /> : 
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* State List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">States Ranking</h3>
            {stateData
              .sort((a, b) => b.customers - a.customers)
              .map((state, index) => {
                const originalIndex = stateData.findIndex(s => s.name === state.name);
                const stateColor = getStateColor(originalIndex);
                
                return (
                <Card 
                  key={state.name} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedState?.name === state.name ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedState(state)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: stateColor }}
                          />
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                        <h4 className="font-semibold">{state.name}</h4>
                      </div>
                      <Badge 
                        variant={state.growth > 0 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {state.growth > 0 ? '+' : ''}{state.growth}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Customers: {state.customers.toLocaleString()}</span>
                      <span className="flex items-center gap-1">
                        {state.growth > 0 ? 
                          <TrendingUp className="h-3 w-3 text-green-500" /> : 
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        }
                        vs last year
                      </span>
                    </div>
                    
                    {/* Progress bar showing relative customer count */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{
                            backgroundColor: stateColor,
                            width: `${(state.customers / Math.max(...stateData.map(s => s.customers))) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )})}
          </div>

          {/* Selected State Details */}
          {selectedState && (
            <Card className="mt-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Selected: {selectedState.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Capital:</strong> {selectedState.capital}</p>
                  <p><strong>Total Customers:</strong> {selectedState.customers.toLocaleString()}</p>
                  <p><strong>YoY Growth:</strong> {selectedState.growth > 0 ? '+' : ''}{selectedState.growth}%</p>
                  <p><strong>Market Share:</strong> {((selectedState.customers / totalCustomers) * 100).toFixed(1)}%</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerMap;