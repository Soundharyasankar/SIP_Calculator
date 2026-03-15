import { useState } from 'react';
import { Clock, Trophy, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { calculateDelayImpact, calculateLumpSum, formatCurrency } from '../../utils/financialCalculations';

interface AdvancedAnalysisProps {
  monthlySIP: number;
  years: number;
  returnRate: number;
  futureValue: number;
}

const milestones = [
  { amount: 100_000, label: '₹1 Lakh' },
  { amount: 500_000, label: '₹5 Lakh' },
  { amount: 1_000_000, label: '₹10 Lakh' },
  { amount: 5_000_000, label: '₹50 Lakh' },
  { amount: 10_000_000, label: '₹1 Crore' },
];

export function AdvancedAnalysis({ monthlySIP, years, returnRate, futureValue }: AdvancedAnalysisProps) {
  const [delayYears, setDelayYears] = useState(2);

  const totalSIPInvestment = monthlySIP * 12 * years;
  const lumpSumValue = calculateLumpSum(totalSIPInvestment, returnRate, years);
  const delayImpact = calculateDelayImpact(monthlySIP, returnRate, years, delayYears);

  const achievedMilestones = milestones.filter((milestone) => futureValue >= milestone.amount);
  const nextMilestone = milestones.find((milestone) => futureValue < milestone.amount);

  return (
    <Card className="p-6 bg-white shadow-lg border-none">
      <h2 className="text-xl font-semibold text-[#224c87] mb-6">Advanced Features</h2>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="comparison">SIP vs Lump Sum</TabsTrigger>
          <TabsTrigger value="delay">Delay Impact</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#da3832]" />
            SIP vs One-Time Investment Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Monthly SIP Approach</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Investment:</span>
                  <span className="font-semibold text-blue-900">{formatCurrency(totalSIPInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Future Value:</span>
                  <span className="font-semibold text-blue-900">{formatCurrency(futureValue)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-300">
                  <span className="text-gray-700">Returns:</span>
                  <span className="font-bold text-green-600">{formatCurrency(futureValue - totalSIPInvestment)}</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-900">
                ✓ Rupee Cost Averaging
                <br />
                ✓ Lower initial capital needed
                <br />
                ✓ Disciplined investing
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3">Lump Sum Approach</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Investment:</span>
                  <span className="font-semibold text-purple-900">{formatCurrency(totalSIPInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Future Value:</span>
                  <span className="font-semibold text-purple-900">{formatCurrency(lumpSumValue)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-300">
                  <span className="text-gray-700">Returns:</span>
                  <span className="font-bold text-green-600">{formatCurrency(lumpSumValue - totalSIPInvestment)}</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-purple-100 rounded text-xs text-purple-900">
                ✓ Higher potential returns
                <br />
                ✓ Requires large capital upfront
                <br />
                ✓ Market timing risk
              </div>
            </div>
          </div>

          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-sm text-gray-800">
              <strong>Note:</strong> While lump sum may show higher returns, SIP offers the advantage of rupee cost averaging and doesn't require a large upfront amount. Both are valid strategies depending on your financial situation.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="delay" className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#da3832]" />
            Cost of Delaying Your Investment
          </h3>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="text-center mb-6">
              <p className="text-sm text-red-800 mb-2">If you delay by {delayYears} years</p>
              <div className="text-4xl font-bold text-red-600 mb-2">{formatCurrency(delayImpact.loss)}</div>
              <p className="text-sm text-red-800">Potential loss in wealth creation</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Starting Now</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(delayImpact.onTime)}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">After {delayYears} Years</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(delayImpact.delayed)}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-800 mb-3">
                <strong>Why time matters:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>Lost years of compounding cannot be recovered</li>
                <li>Early investments have more time to grow exponentially</li>
                <li>The best time to start was yesterday; the next best time is now</li>
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={delayYears}
                  onChange={(event) => setDelayYears(Number(event.target.value))}
                  className="w-full accent-[#da3832]"
                />
                <span className="text-sm font-semibold text-[#da3832]">{delayYears} yr</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#da3832]" />
            Goal Achievement Tracker
          </h3>

          <div className="space-y-4">
            {milestones.map((milestone) => {
              const achieved = futureValue >= milestone.amount;
              const progress = Math.min((futureValue / milestone.amount) * 100, 100);

              return (
                <div
                  key={milestone.amount}
                  className={`p-4 rounded-lg border-2 ${
                    achieved ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {achieved && <Trophy className="w-4 h-4 text-green-600" />}
                      <span className={`font-semibold ${achieved ? 'text-green-900' : 'text-gray-700'}`}>
                        {milestone.label}
                      </span>
                    </div>
                    <span className={`text-sm ${achieved ? 'text-green-600' : 'text-gray-500'}`}>
                      {achieved ? '✓ Achieved' : `${progress.toFixed(0)}%`}
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className={`h-2 ${achieved ? '[&>div]:bg-green-600' : '[&>div]:bg-blue-600'}`}
                  />
                </div>
              );
            })}
          </div>

          {nextMilestone && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-sm">
                <strong>Next Milestone:</strong> You're on track! Your projected corpus of{' '}
                <span className="font-semibold text-blue-900">{formatCurrency(futureValue)}</span>
                {futureValue < nextMilestone.amount && (
                  <> needs {formatCurrency(nextMilestone.amount - futureValue)} more to reach {nextMilestone.label}</>
                )}
              </AlertDescription>
            </Alert>
          )}

          {achievedMilestones.length === milestones.length && (
            <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg border-2 border-green-300">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-bold text-green-900 text-lg mb-2">🎉 All Milestones Achieved!</h4>
              <p className="text-sm text-green-800">Congratulations! Your investment plan is set to achieve all major milestones.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
