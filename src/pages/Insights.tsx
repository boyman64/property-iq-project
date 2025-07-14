import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProperties, cityStats, seasonalData } from '@/data/mockProperties';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Star,
  AlertCircle,
  CheckCircle,
  Target
} from 'lucide-react';

const Insights = () => {
  // Calculate key insights
  const bestAreaToBuy = mockProperties.reduce((cheapest, property) => 
    property.price < cheapest.price ? property : cheapest
  );

  const bestMonth = seasonalData.reduce((best, month) => 
    month.savings > best.savings ? month : best
  );

  const fastestGrowingCity = cityStats.reduce((fastest, city) => 
    city.priceChange > fastest.priceChange ? city : fastest
  );

  const highestDemandCity = cityStats.reduce((highest, city) => 
    city.demandScore > highest.demandScore ? city : highest
  );

  // Market trends
  const avgPriceGrowth = cityStats.reduce((sum, city) => sum + city.priceChange, 0) / cityStats.length;
  const totalListings = cityStats.reduce((sum, city) => sum + city.totalListings, 0);
  const avgPrice = Math.round(cityStats.reduce((sum, city) => sum + city.averagePrice, 0) / cityStats.length);

  const insights = [
    {
      type: 'opportunity',
      title: 'Best Investment Opportunity',
      description: `${bestAreaToBuy.district}, ${bestAreaToBuy.city} offers excellent value at $${bestAreaToBuy.price.toLocaleString()}`,
      action: 'View Properties',
      icon: Target,
      color: 'success'
    },
    {
      type: 'timing',
      title: 'Optimal Buying Time',
      description: `${bestMonth.month} is the best month to buy, offering up to ${bestMonth.savings.toFixed(1)}% savings`,
      action: 'See Seasonal Analysis',
      icon: Calendar,
      color: 'info'
    },
    {
      type: 'growth',
      title: 'Fastest Growing Market',
      description: `${fastestGrowingCity.city} shows ${fastestGrowingCity.priceChange.toFixed(1)}% price growth`,
      action: 'Explore Trends',
      icon: TrendingUp,
      color: 'warning'
    },
    {
      type: 'demand',
      title: 'Highest Demand Area',
      description: `${highestDemandCity.city} has the highest demand score of ${highestDemandCity.demandScore}`,
      action: 'Check Hot Zones',
      icon: MapPin,
      color: 'primary'
    }
  ];

  const marketAlerts = [
    {
      type: 'positive',
      title: 'Market Growth',
      message: `Average price growth of ${avgPriceGrowth.toFixed(1)}% indicates a healthy market`
    },
    {
      type: 'neutral',
      title: 'Inventory Levels',
      message: `${totalListings} active listings provide good selection for buyers`
    },
    {
      type: 'positive',
      title: 'Investment Climate',
      message: 'Multiple districts show strong investment potential with varied price points'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Market Insights</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and personalized recommendations for your real estate decisions
          </p>
        </div>

        {/* Market Summary */}
        <Card className="shadow-elegant bg-gradient-hero">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary-foreground">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">${avgPrice.toLocaleString()}</div>
                <p className="text-primary-foreground/80">Average Market Price</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+{avgPriceGrowth.toFixed(1)}%</div>
                <p className="text-primary-foreground/80">Average Growth Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{totalListings}</div>
                <p className="text-primary-foreground/80">Active Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    insight.color === 'success' ? 'bg-success/10' :
                    insight.color === 'info' ? 'bg-info/10' :
                    insight.color === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    <insight.icon className={`w-5 h-5 ${
                      insight.color === 'success' ? 'text-success' :
                      insight.color === 'info' ? 'text-info' :
                      insight.color === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{insight.description}</p>
                <Badge 
                  variant="outline" 
                  className={`${
                    insight.color === 'success' ? 'border-success text-success' :
                    insight.color === 'info' ? 'border-info text-info' :
                    insight.color === 'warning' ? 'border-warning text-warning' :
                    'border-primary text-primary'
                  }`}
                >
                  {insight.action}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* This Week's Highlights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              This Week's Market Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-success">Best Value</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>{bestAreaToBuy.district}</strong> offers the best value proposition 
                  with a {bestAreaToBuy.area}m² {bestAreaToBuy.propertyType} at 
                  ${(bestAreaToBuy.price / bestAreaToBuy.area).toFixed(0)}/m²
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-warning">Growth Leader</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>{fastestGrowingCity.city}</strong> leads with {fastestGrowingCity.priceChange.toFixed(1)}% 
                  growth, indicating strong market momentum and investment potential
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-info" />
                  <h3 className="font-semibold text-info">Hot Market</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>{highestDemandCity.city}</strong> shows highest activity with 
                  {highestDemandCity.totalListings} listings and demand score of {highestDemandCity.demandScore}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Market Alerts & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketAlerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    alert.type === 'positive' 
                      ? 'border-success bg-success/5' 
                      : alert.type === 'negative'
                      ? 'border-destructive bg-destructive/5'
                      : 'border-info bg-info/5'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    alert.type === 'positive' 
                      ? 'bg-success text-success-foreground' 
                      : alert.type === 'negative'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-info text-info-foreground'
                  }`}>
                    {alert.type === 'positive' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      alert.type === 'positive' 
                        ? 'text-success' 
                        : alert.type === 'negative'
                        ? 'text-destructive'
                        : 'text-info'
                    }`}>
                      {alert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Recommendation */}
        <Card className="shadow-elegant border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-analytics rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  PropertyIQ Recommendation
                </h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Based on our comprehensive analysis of market trends, seasonal patterns, and demand indicators, 
                    we recommend focusing on <strong>{bestAreaToBuy.district}, {bestAreaToBuy.city}</strong> for 
                    immediate investment opportunities, particularly during <strong>{bestMonth.month}</strong> 
                    when prices are typically {bestMonth.savings.toFixed(1)}% below average.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">High Value</Badge>
                    <Badge variant="outline">Growing Market</Badge>
                    <Badge variant="outline">Optimal Timing</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;