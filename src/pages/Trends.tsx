import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { marketTrendData } from '@/data/mockProperties';
import { TrendingUp, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Trends = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [timeRange, setTimeRange] = useState('6months');

  const cities = ['all', ...Array.from(new Set(marketTrendData.map(item => item.city)))];
  
  // Helper function to filter data by time range
  const getTimeRangeMonths = (range: string) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    switch (range) {
      case '3months':
        return 3;
      case '6months':
        return 6;
      case '1year':
        return 12;
      default:
        return 6;
    }
  };

  // Filter by city first
  const cityFilteredData = selectedCity === 'all' 
    ? marketTrendData.reduce((acc: any[], curr) => {
        const existing = acc.find(item => item.month === curr.month);
        if (existing) {
          existing.averagePrice = Math.round((existing.averagePrice + curr.averagePrice) / 2);
          existing.totalListings += curr.totalListings;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, [])
    : marketTrendData.filter(item => item.city === selectedCity);

  // Then filter by time range
  const monthsToShow = getTimeRangeMonths(timeRange);
  const filteredData = cityFilteredData.slice(-monthsToShow);

  const priceChangeData = filteredData.map((item, index) => ({
    ...item,
    priceChange: index > 0 ? ((item.averagePrice - filteredData[index - 1].averagePrice) / filteredData[index - 1].averagePrice) * 100 : 0
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Price Trends</h1>
          <p className="text-muted-foreground">
            Analyze property price movements and market trends over time
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Filter Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Trend Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Average Price Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="averagePrice"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Price Change Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Price Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceChangeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Price Change']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="priceChange" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Market Activity (Total Listings)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="listingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [Number(value).toLocaleString(), 'Total Listings']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalListings"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    fill="url(#listingsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-2">
                +{((filteredData[filteredData.length - 1]?.averagePrice - filteredData[0]?.averagePrice) / filteredData[0]?.averagePrice * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Total price growth over period</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-info mb-2">
                ${Math.round(filteredData.reduce((sum, item) => sum + item.averagePrice, 0) / filteredData.length).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Average price over period</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-2">
                {Math.round(filteredData.reduce((sum, item) => sum + item.totalListings, 0) / filteredData.length).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Average listings per month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trends;