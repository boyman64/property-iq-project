import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProperties, cityStats } from '@/data/mockProperties';
import { Zap, TrendingUp, MapPin, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HotZones = () => {
  // Calculate demand by area
  const demandByArea = mockProperties.reduce((acc: any, property) => {
    const key = `${property.district}, ${property.city}`;
    if (!acc[key]) {
      acc[key] = {
        area: key,
        district: property.district,
        city: property.city,
        listings: 0,
        totalValue: 0,
        demandScore: 0
      };
    }
    acc[key].listings += 1;
    acc[key].totalValue += property.price;
    return acc;
  }, {});

  // Calculate demand scores and sort
  const hotZones = Object.values(demandByArea)
    .map((area: any) => ({
      ...area,
      averagePrice: Math.round(area.totalValue / area.listings),
      demandScore: Math.round((area.listings * 10) + (area.totalValue / area.listings / 1000) * 0.1)
    }))
    .sort((a, b) => b.demandScore - a.demandScore);

  // Prepare chart data
  const chartData = hotZones.slice(0, 6).map(zone => ({
    name: zone.district,
    listings: zone.listings,
    demandScore: zone.demandScore,
    avgPrice: zone.averagePrice
  }));

  // City distribution data for pie chart
  const cityDistribution = cityStats.map(city => ({
    name: city.city,
    value: city.totalListings,
    demandScore: city.demandScore
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--info))', 'hsl(var(--warning))'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Hot Zones</h1>
          <p className="text-muted-foreground">
            Identify high-demand locations with the most market activity and investment potential
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-analytics rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {hotZones.length > 0 ? hotZones[0].district : 'N/A'}
              </div>
              <p className="text-sm text-muted-foreground">Hottest Zone</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                {hotZones.length > 0 ? hotZones[0].demandScore : 0}
              </div>
              <p className="text-sm text-muted-foreground">Peak Demand Score</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-info" />
              </div>
              <div className="text-2xl font-bold text-info mb-1">
                {hotZones.reduce((sum, zone) => sum + zone.listings, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Listings</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">
                {Math.round(hotZones.reduce((sum, zone) => sum + zone.demandScore, 0) / hotZones.length || 0)}
              </div>
              <p className="text-sm text-muted-foreground">Avg Demand Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Demand Activity Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Market Activity by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      name === 'listings' ? `${value} properties` : `Score: ${value}`,
                      name === 'listings' ? 'Active Listings' : 'Demand Score'
                    ]}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="listings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="demandScore" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hot Zones Ranking */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              High-Demand Areas Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotZones.map((zone, index) => {
                const intensity = index < 3 ? 'high' : index < 6 ? 'medium' : 'low';
                return (
                  <div 
                    key={zone.area}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      intensity === 'high' 
                        ? 'border-primary bg-primary/5 shadow-card' 
                        : intensity === 'medium'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-border hover:shadow-card'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                        intensity === 'high'
                          ? 'bg-gradient-analytics text-primary-foreground'
                          : intensity === 'medium'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{zone.area}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{zone.listings} active listings</span>
                          <span>Avg: ${zone.averagePrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold mb-1 ${
                        intensity === 'high' ? 'text-primary' : 
                        intensity === 'medium' ? 'text-secondary' : 'text-muted-foreground'
                      }`}>
                        {zone.demandScore}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className={`w-4 h-4 ${
                          intensity === 'high' ? 'text-primary' : 
                          intensity === 'medium' ? 'text-secondary' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          {intensity === 'high' ? 'Very High' : 
                           intensity === 'medium' ? 'High' : 'Moderate'} Demand
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* City Market Share */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Market Activity by City</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, value}) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">Market Intelligence</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-success mb-2">Hottest Investment Areas</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {hotZones.slice(0, 3).map((zone, index) => (
                        <li key={zone.area} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <strong>{zone.district}:</strong> {zone.demandScore} demand score
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-info mb-2">Market Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Areas with high demand scores indicate strong market activity, 
                      making them excellent choices for both investors and buyers 
                      looking for properties with good resale potential.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotZones;