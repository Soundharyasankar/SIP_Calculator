import { AlertTriangle, Award, Target, TrendingUp, Wallet } from 'lucide-react';
import { Card } from '../ui/card';
import { CalculationType, InvestmentResults } from '../../types/investment';
import { formatCurrency } from '../../utils/financialCalculations';

interface InvestmentSummaryProps {
  results: InvestmentResults;
  calculationType: CalculationType;
}

const getHealthScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getHealthScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Needs Improvement';
};

export function InvestmentSummary({ results, calculationType }: InvestmentSummaryProps) {
  return (
    <Card className="p-6 bg-white shadow-lg border-none">
      <h2 className="text-xl font-semibold text-[#224c87] mb-6">Investment Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {calculationType === 'goal' && (
          <div className="bg-gradient-to-br from-[#224c87] to-[#2d5fa1] p-4 rounded-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm opacity-90">Required Monthly SIP</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(results.requiredSIP)}</div>
            <div className="text-xs opacity-75 mt-1">To achieve your goal</div>
          </div>
        )}

        <div className="bg-gradient-to-br from-[#da3832] to-[#e84e48] p-4 rounded-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Future Value</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(results.futureValue)}</div>
          <div className="text-xs opacity-75 mt-1">Projected corpus</div>
        </div>

        <div className="bg-gradient-to-br from-[#919090] to-[#a5a5a5] p-4 rounded-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5" />
            <span className="text-sm opacity-90">Total Investment</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(results.totalInvestment)}</div>
          <div className="text-xs opacity-75 mt-1">Your contribution</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-sm opacity-90">Total Returns</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(results.totalReturns)}</div>
          <div className="text-xs opacity-75 mt-1">
            {results.totalInvestment > 0
              ? ((results.totalReturns / results.totalInvestment) * 100).toFixed(1)
              : '0.0'}
            % gain
          </div>
        </div>
      </div>

      {calculationType === 'goal' && results.inflationAdjustedGoal > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Inflation Impact</h3>
              <p className="text-sm text-amber-800">
                Due to inflation, your goal of {formatCurrency(results.inflationAdjustedGoal / Math.pow(1.06, 10))} today
                will cost approximately <span className="font-semibold">{formatCurrency(results.inflationAdjustedGoal)}</span> in the future.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`border-2 rounded-lg p-4 ${getHealthScoreColor(results.financialHealthScore)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Financial Health Score</h3>
          <span className="text-3xl font-bold">{results.financialHealthScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-current transition-all duration-500"
            style={{ width: `${results.financialHealthScore}%` }}
          />
        </div>
        <p className="text-xs mt-2 opacity-80">
          {getHealthScoreLabel(results.financialHealthScore)} -
          {results.financialHealthScore >= 80
            ? ' Your investment plan is well-structured'
            : results.financialHealthScore >= 60
            ? ' Consider increasing your investment slightly'
            : ' Increase your SIP to improve goal achievement'}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Investment Breakdown</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Principal Amount</span>
            <span className="font-semibold text-[#224c87]">{formatCurrency(results.totalInvestment)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Interest Earned</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.totalReturns)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-semibold text-gray-900">Total Corpus</span>
            <span className="font-bold text-[#da3832]">{formatCurrency(results.futureValue)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
