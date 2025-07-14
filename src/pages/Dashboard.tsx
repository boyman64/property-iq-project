import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '@/components/StatCard';
import PropertyCard from '@/components/PropertyCard';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import { mockProperties, cityStats, Property } from '@/data/mockProperties';
import { 
  TrendingUp, 
  Building2, 
  MapPin, 
  DollarSign,
  Search,
  Filter,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const quickTrendData = [
  { month: 'Sep', price: 145000 },
  { month: 'Oct', price: 148000 },
  { month: 'Nov', price: 152000 },
  { month: 'Dec', price: 155000 },
  { month: 'Jan', price: 158000 },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('all-cities');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all-types');

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  const handleCloseModal = () => {
    setShowPropertyModal(false);
    setSelectedProperty(null);
  };

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = !selectedCity || selectedCity === 'all-cities' || property.city === selectedCity;
    const matchesType = !selectedPropertyType || selectedPropertyType === 'all-types' || property.propertyType === selectedPropertyType;
    
    return matchesSearch && matchesCity && matchesType;
  });

  const totalListings = cityStats.reduce((sum, city) => sum + city.totalListings, 0);
  const avgPrice = Math.round(cityStats.reduce((sum, city) => sum + city.averagePrice, 0) / cityStats.length);
  const avgPriceChange = cityStats.reduce((sum, city) => sum + city.priceChange, 0) / cityStats.length;

  const displayedProperties = showAllProperties ? filteredProperties : filteredProperties.slice(0, 6);
  const uniqueCities = [...new Set(mockProperties.map(p => p.city))];
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const clearFilters = () => {
    setSelectedCity('all-cities');
    setSelectedPropertyType('all-types');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            PropertyIQ Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced market insights and analytics for Georgian real estate. 
            Make smarter property investment decisions with data-driven intelligence.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Listings"
            value={totalListings}
            change={{ value: 12.3, type: 'increase' }}
            icon={Building2}
            description="Active properties"
          />
          <StatCard
            title="Average Price"
            value={`$${avgPrice.toLocaleString()}`}
            change={{ value: Number(avgPriceChange.toFixed(1)), type: 'increase' }}
            icon={DollarSign}
            description="Across all cities"
          />
          <StatCard
            title="Cities Tracked"
            value={cityStats.length}
            icon={MapPin}
            description="Major Georgian cities"
          />
          <StatCard
            title="Market Growth"
            value={`+${avgPriceChange.toFixed(1)}%`}
            change={{ value: 2.1, type: 'increase' }}
            icon={TrendingUp}
            description="Year over year"
          />
        </div>

        {/* Quick Market Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Market Trend Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quickTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Avg Price']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Search */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Search Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by city, district, or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                variant="analytics"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border">
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="All cities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-cities">All cities</SelectItem>
                      {uniqueCities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All types</SelectItem>
                      {propertyTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredProperties.length > 6 && !showAllProperties && (
              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setShowAllProperties(true)}
                >
                  View All Properties
                </Button>
              </div>
            )}

            {showAllProperties && filteredProperties.length > 6 && (
              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setShowAllProperties(false)}
                >
                  Show Less
                </Button>
              </div>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No properties found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* City Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>City Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cityStats.map((city, index) => (
                <div key={city.city} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-analytics rounded-lg flex items-center justify-center text-primary-foreground font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{city.city}</h3>
                      <p className="text-sm text-muted-foreground">
                        {city.totalListings} listings
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${city.averagePrice.toLocaleString()}</p>
                    <p className={`text-sm ${city.priceChange > 0 ? 'text-success' : 'text-destructive'}`}>
                      {city.priceChange > 0 ? '+' : ''}{city.priceChange.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Property Details Modal */}
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={showPropertyModal}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Dashboard;