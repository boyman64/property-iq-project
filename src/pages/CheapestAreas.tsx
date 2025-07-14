import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProperties, cityStats } from '@/data/mockProperties';
import { MapPin, TrendingDown, Filter, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const CheapestAreas = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');

  // Calculate average prices by district
  const districtPrices = mockProperties.reduce((acc: any, property) => {
    const key = `${property.district}, ${property.city}`;
    if (!acc[key]) {
      acc[key] = {
        district: property.district,
        city: property.city,
        prices: [],
        totalArea: 0,
        count: 0,
        propertyTypes: new Set()
      };
    }
    
    if (selectedPropertyType === 'all' || property.propertyType === selectedPropertyType) {
      acc[key].prices.push(property.price);
      acc[key].totalArea += property.area;
      acc[key].count += 1;
      acc[key].propertyTypes.add(property.propertyType);
    }
    
    return acc;
  }, {});

  // Calculate averages and sort by price
  const cheapestAreas = Object.values(districtPrices)
    .filter((area: any) => area.count > 0)
    .map((area: any) => ({
      name: `${area.district}, ${area.city}`,
      district: area.district,
      city: area.city,
      averagePrice: Math.round(area.prices.reduce((sum: number, price: number) => sum + price, 0) / area.prices.length),
      pricePerSqm: Math.round(area.prices.reduce((sum: number, price: number) => sum + price, 0) / area.totalArea),
      properties: area.count,
      types: Array.from(area.propertyTypes).join(', ')
    }))
    .sort((a, b) => a.averagePrice - b.averagePrice);

  const chartData = cheapestAreas.slice(0, 8).map(area => ({
    name: area.district,
    price: area.averagePrice,
    pricePerSqm: area.pricePerSqm
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Cheapest Areas</h1>
          <p className="text-muted-foreground">
            Discover the most affordable districts and neighborhoods for property investment
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Filter by Property Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                <SelectItem value="apartment">Apartments</SelectItem>
                <SelectItem value="house">Houses</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Price Comparison Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Average Prices by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      name === 'price' ? `$${Number(value).toLocaleString()}` : `$${Number(value).toLocaleString()}/m²`,
                      name === 'price' ? 'Avg Price' : 'Price per m²'
                    ]}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Areas Ranking Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Most Affordable Areas Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cheapestAreas.map((area, index) => (
                <div key={area.name} className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-card transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                      index < 3 
                        ? 'bg-gradient-analytics text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{area.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {area.properties} {area.properties === 1 ? 'property' : 'properties'} • {area.types}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-lg">${area.averagePrice.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">${area.pricePerSqm}/m²</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-2">
                {cheapestAreas.length > 0 ? `$${cheapestAreas[0].averagePrice.toLocaleString()}` : 'N/A'}
              </div>
              <p className="text-sm text-muted-foreground">Most affordable area</p>
              <p className="text-xs text-muted-foreground mt-1">
                {cheapestAreas.length > 0 ? cheapestAreas[0].name : 'No data'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-info mb-2">
                ${Math.round(cheapestAreas.reduce((sum, area) => sum + area.averagePrice, 0) / cheapestAreas.length || 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Average across all areas</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-2">
                {cheapestAreas.reduce((sum, area) => sum + area.properties, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total properties analyzed</p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Tip */}
        <Card className="shadow-card border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-success mt-1" />
              <div>
                <h3 className="font-semibold text-success mb-2">Investment Insight</h3>
                <p className="text-muted-foreground">
                  {cheapestAreas.length > 0 && (
                    <>
                      <strong>{cheapestAreas[0].name}</strong> offers the best value with an average price of 
                      <strong> ${cheapestAreas[0].averagePrice.toLocaleString()}</strong> and 
                      <strong> {cheapestAreas[0].properties}</strong> available {cheapestAreas[0].properties === 1 ? 'property' : 'properties'}. 
                      This represents excellent potential for first-time buyers and investors looking for affordable entry points.
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheapestAreas;