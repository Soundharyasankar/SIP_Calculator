import { useEffect, useState } from 'react';
import { Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { InvestmentInput } from '../../types/investment';
import { generateFinancialCoaching } from '../../services/huggingFaceClient';

interface AdvisorInsightsProps {
  inputValues: InvestmentInput;
  futureValue: number;
}

export function AdvisorInsights({ inputValues, futureValue }: AdvisorInsightsProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValues.monthlySIP > 0) {
      fetchInsights();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.monthlySIP, inputValues.years, inputValues.returnRate, inputValues.goalName]);

  const fetchInsights = async () => {
    setLoading(true);

    try {
      const aiResponse = await generateFinancialCoaching({
        sip: inputValues.monthlySIP,
        years: inputValues.years,
        returnRate: inputValues.returnRate,
        inflationRate: inputValues.inflationRate,
        goal: inputValues.goalName,
        goalCost: inputValues.goalCost,
      });

      const lines = normalizeInsightLines(aiResponse);

      if (lines.length) {
        setInsights(lines);
      } else {
        setInsights(buildFallbackInsights());
      }
    } catch (error) {
      console.warn('AI Insights unavailable, using fallback:', error);
      setInsights(buildFallbackInsights());
    } finally {
      setLoading(false);
    }
  };

  const normalizeInsightLines = (text: string): string[] =>
    text
      .split(/\n|•|\u2022/)
      .map((line) => line.trim())
      .filter((line) => line.length > 15)
      .slice(0, 3);

  const buildFallbackInsights = (): string[] => [
    `Starting early with ₹${inputValues.monthlySIP.toLocaleString('en-IN')}/month maximizes compounding for ${inputValues.goalName}.`,
    `A ${inputValues.returnRate}% return over ${inputValues.years} years can build wealth steadily; stay disciplined with contributions.`,
    'Review and increase your SIP annually by ~10% to stay ahead of inflation and keep your goal on track.',
    `Projecting ₹${futureValue.toLocaleString('en-IN')} provides a realistic view of what this plan can deliver; stay invested through market cycles.`,
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-purple-900">AI-Powered Financial Insights</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            <span className="ml-3 text-purple-700">Analyzing your investment plan...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-100">
                <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-800">
            <strong>Powered by Hugging Face AI</strong> - These insights are generated using advanced language models to provide personalized financial guidance.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-600 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-amber-900">The Power of Compounding</h3>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800">Your investment grows exponentially due to compounding. Here's what makes it powerful:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span className="text-gray-700">
                <strong>Year 1-5:</strong> Returns grow slowly as the base is small
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span className="text-gray-700">
                <strong>Year 6-15:</strong> Growth accelerates as returns compound on returns
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span className="text-gray-700">
                <strong>Year 16+:</strong> Exponential growth phase - most wealth is created here
              </span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-white rounded-lg border-2 border-amber-300">
            <p className="text-sm text-gray-900">
              <strong>💡 Pro Tip:</strong> Starting early and staying invested are the two most important factors. Even a small delay can significantly impact your final corpus.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
