import { AppHeader } from '../components/layout/AppHeader';
import { InvestmentInputs } from '../components/forms/InvestmentInputs';
import { InvestmentSummary } from '../components/summary/InvestmentSummary';
import { PerformanceCharts } from '../components/charts/PerformanceCharts';
import { AdvancedAnalysis } from '../components/analysis/AdvancedAnalysis';
import { AdvisorInsights } from '../components/insights/AdvisorInsights';
import { LegalDisclaimer } from '../components/layout/LegalDisclaimer';
import { useInvestmentCalculator } from '../hooks/useInvestmentCalculator';

export function GoalSipCalculatorPage() {
  const {
    calculationType,
    setCalculationType,
    inputs,
    updateInputs,
    results,
    monthlyData,
    monteCarloData,
  } = useInvestmentCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" style={{ fontFamily: 'Montserrat, Arial, Verdana, sans-serif' }}>
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InvestmentInputs
            values={inputs}
            onChange={updateInputs}
            calculationType={calculationType}
            onCalculationTypeChange={setCalculationType}
          />
          <InvestmentSummary results={results} calculationType={calculationType} />
        </div>

        <PerformanceCharts
          monthlyData={monthlyData}
          totalInvestment={results.totalInvestment}
          totalReturns={results.totalReturns}
          monteCarloData={monteCarloData}
        />

        <AdvancedAnalysis
          monthlySIP={calculationType === 'goal' ? results.requiredSIP : inputs.monthlySIP}
          years={inputs.years}
          returnRate={inputs.returnRate}
          futureValue={results.futureValue}
        />

        <AdvisorInsights inputValues={inputs} futureValue={results.futureValue} />

        <LegalDisclaimer />

        <footer className="text-center py-6 text-sm text-gray-600">
          <p className="mb-2">Goal-Based SIP Calculator with AI-Powered Insights</p>
          <p className="text-xs">Built with React, Tailwind CSS, Recharts, and Hugging Face AI | For Educational Purposes Only</p>
        </footer>
      </main>
    </div>
  );
}
