import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MonthlyData } from '../../utils/financialCalculations';

interface PerformanceChartsProps {
  monthlyData: MonthlyData[];
  totalInvestment: number;
  totalReturns: number;
  monteCarloData?: number[][];
}

const formatCurrencyForAxis = (value: number) => {
  if (!value || Number.isNaN(value)) return '\u20B90';
  if (value >= 10_000_000) return `\u20B9${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `\u20B9${(value / 100_000).toFixed(1)}L`;
  return `\u20B9${(value / 1_000).toFixed(0)}K`;
};

export function PerformanceCharts({ monthlyData, totalInvestment, totalReturns, monteCarloData }: PerformanceChartsProps) {
  const growthData = (() => {
    if (!Array.isArray(monthlyData) || monthlyData.length === 0) return [];

    const yearMap = new Map<number, MonthlyData>();
    monthlyData.forEach((data) => {
      const year = Math.floor(data.month / 12);
      const existingData = yearMap.get(year);
      if (!existingData || data.month > existingData.month) {
        yearMap.set(year, data);
      }
    });

    return Array.from(yearMap.entries())
      .map(([year, data]) => ({
        id: `year-${year}`,
        year,
        investment: Math.round(data.investment),
        value: Math.round(data.value),
      }))
      .sort((a, b) => a.year - b.year);
  })();

  const pieData = [
    { name: 'Principal', value: totalInvestment || 0, color: '#224c87' },
    { name: 'Returns', value: totalReturns || 0, color: '#da3832' },
  ];

  const monteCarloChartData = (() => {
    if (!monteCarloData || !Array.isArray(monteCarloData) || monteCarloData.length === 0) return [];

    const firstScenario = monteCarloData[0];
    if (!firstScenario || !Array.isArray(firstScenario) || firstScenario.length === 0) return [];

    return firstScenario
      .map((_, index) => {
        const values = monteCarloData
          .map((scenario) => scenario[index] || 0)
          .filter((value) => value > 0);

        if (values.length === 0) return null;

        values.sort((a, b) => a - b);
        return {
          id: `mc-year-${index + 1}`,
          year: index + 1,
          p5: Math.round(values[Math.floor(values.length * 0.05)] || 0),
          p50: Math.round(values[Math.floor(values.length * 0.5)] || 0),
          p95: Math.round(values[Math.floor(values.length * 0.95)] || 0),
        };
      })
      .filter(Boolean);
  })();

  return (
    <Card className="p-6 bg-white shadow-lg border-none">
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="growth">Growth Chart</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="montecarlo">Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="mt-6">
          <h3 className="font-semibold text-[#224c87] mb-4">Investment Growth Over Time</h3>
          {growthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#919090" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#919090" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#224c87" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#224c87" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} stroke="#666" />
                <YAxis tickFormatter={formatCurrencyForAxis} stroke="#666" />
                <Tooltip
                  formatter={(value: number) => [`\u20B9${value.toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="investment" stackId="1" stroke="#919090" fill="url(#colorInvestment)" name="Total Investment" />
                <Area type="monotone" dataKey="value" stackId="2" stroke="#224c87" fill="url(#colorValue)" name="Future Value" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Loading chart data...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="breakdown" className="mt-6">
          <h3 className="font-semibold text-[#224c87] mb-4">Investment vs Returns</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `\u20B9${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }} />
                  <div>
                    <div className="font-semibold text-gray-900">{entry.name}</div>
                    <div className="text-sm text-gray-600">\u20B9{entry.value.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="montecarlo" className="mt-6">
          <h3 className="font-semibold text-[#224c87] mb-4">Monte Carlo Simulation (Market Scenarios)</h3>
          {monteCarloChartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monteCarloChartData as { year: number; p5: number; p50: number; p95: number }[]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} stroke="#666" />
                  <YAxis tickFormatter={formatCurrencyForAxis} stroke="#666" />
                  <Tooltip
                    formatter={(value: number) => [`\u20B9${value.toLocaleString('en-IN')}`, '']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="p5" stroke="#ef4444" strokeWidth={2} name="Worst Case (5th %ile)" dot={false} />
                  <Line type="monotone" dataKey="p50" stroke="#224c87" strokeWidth={3} name="Median Case (50th %ile)" dot={false} />
                  <Line type="monotone" dataKey="p95" stroke="#22c55e" strokeWidth={2} name="Best Case (95th %ile)" dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Understanding Scenarios:</strong> This simulation shows possible investment outcomes based on market volatility. The median line represents the most likely outcome, while the shaded areas show the range of possibilities. Markets can fluctuate, so actual results may vary.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Running Monte Carlo simulation...</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
