import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seasonalData } from '@/data/mockProperties';
import { Calendar, TrendingDown, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const BestTimeToBuy = () => {
  const bestMonth = seasonalData.reduce((best, month) => 
    month.savings > best.savings ? month : best
  );
  
  const worstMonth = seasonalData.reduce((worst, month) => 
    month.savings < worst.savings ? month : worst
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Best Time to Buy</h1>
          <p className="text-muted-foreground">
            Seasonal analysis revealing the optimal timing for property purchases based on historical price patterns
          </p>
        </div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Month to Buy</p>
                  <p className="text-2xl font-bold text-success">{bestMonth.month}</p>
                  <p className="text-sm text-success">Save up to {bestMonth.savings.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Most Expensive</p>
                  <p className="text-2xl font-bold text-destructive">{worstMonth.month}</p>
                  <p className="text-sm text-destructive">{Math.abs(worstMonth.savings).toFixed(1)}% above average</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-info">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-2xl font-bold text-info">
                    {((bestMonth.savings - worstMonth.savings)).toFixed(1)}%
                  </p>
                  <p className="text-sm text-info">Annual variation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Price Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Average Prices by Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Bar 
                    dataKey="avgPrice" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Savings Potential */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Potential Savings by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Savings']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Analysis Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Detailed Monthly Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {seasonalData.map((month, index) => (
                <div 
                  key={month.month}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    month.month === bestMonth.month 
                      ? 'border-success bg-success/5' 
                      : month.month === worstMonth.month
                      ? 'border-destructive bg-destructive/5'
                      : 'border-border hover:shadow-card'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                      month.month === bestMonth.month
                        ? 'bg-success text-success-foreground'
                        : month.month === worstMonth.month
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{month.month}</h3>
                      <p className="text-sm text-muted-foreground">
                        {month.month === bestMonth.month 
                          ? 'Best time to buy' 
                          : month.month === worstMonth.month
                          ? 'Most expensive month'
                          : 'Regular market period'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${month.avgPrice.toLocaleString()}</p>
                    <p className={`text-sm ${
                      month.savings > 0 
                        ? 'text-success' 
                        : month.savings < 0 
                        ? 'text-destructive' 
                        : 'text-muted-foreground'
                    }`}>
                      {month.savings > 0 ? '+' : ''}{month.savings.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="shadow-card border-l-4 border-l-info">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-info" />
                <h3 className="text-lg font-semibold text-info">Strategic Buying Recommendations</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-success">Optimal Buying Periods</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <strong>November-January:</strong> Peak savings period (4.5-7.1%)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <strong>September-October:</strong> Good secondary option (2.6-3.9%)
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-destructive">Avoid These Periods</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <strong>April-June:</strong> Peak prices (4.0-6.5% above average)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <strong>March:</strong> Rising market period (2.1% above average)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BestTimeToBuy;