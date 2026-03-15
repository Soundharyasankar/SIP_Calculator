import { useCallback, useEffect, useState } from 'react';
import {
  calculateFinancialHealthScore,
  calculateRequiredSIP,
  calculateSIPFutureValue,
  calculateStepUpSIP,
  runMonteCarloSimulation,
  MonthlyData,
} from '../utils/financialCalculations';
import { CalculationType, InvestmentInput, InvestmentResults } from '../types/investment';

const DEFAULT_INPUT: InvestmentInput = {
  goalName: 'Retirement Planning',
  goalCost: 5_000_000,
  years: 15,
  returnRate: 12,
  inflationRate: 6,
  monthlySIP: 10_000,
  stepUpRate: 10,
  monthlyIncome: 50_000,
};

const EMPTY_RESULTS: InvestmentResults = {
  requiredSIP: 0,
  futureValue: 0,
  totalInvestment: 0,
  totalReturns: 0,
  inflationAdjustedGoal: 0,
  financialHealthScore: 0,
};

export const useInvestmentCalculator = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('sip');
  const [inputs, setInputs] = useState<InvestmentInput>(DEFAULT_INPUT);
  const [results, setResults] = useState<InvestmentResults>(EMPTY_RESULTS);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [monteCarloData, setMonteCarloData] = useState<number[][]>([]);

  const updateInputs = (next: Partial<InvestmentInput>) =>
    setInputs((prev) => ({ ...prev, ...next }));

  const calculateResults = useCallback(() => {
    try {
      let calculationResult;

      if (calculationType === 'goal') {
        calculationResult = calculateRequiredSIP(
          inputs.goalCost,
          inputs.years,
          inputs.returnRate,
          inputs.inflationRate
        );
      } else if (inputs.stepUpRate > 0) {
        calculationResult = {
          ...calculateStepUpSIP(
            inputs.monthlySIP,
            inputs.stepUpRate,
            inputs.returnRate,
            inputs.years
          ),
          requiredSIP: inputs.monthlySIP,
          inflationAdjustedGoal: 0,
        };
      } else {
        calculationResult = calculateSIPFutureValue(
          inputs.monthlySIP,
          inputs.returnRate,
          inputs.years
        );
        calculationResult.requiredSIP = inputs.monthlySIP;
      }

      const inflationAdjustedGoal =
        calculationType === 'goal'
          ? inputs.goalCost * Math.pow(1 + inputs.inflationRate / 100, inputs.years)
          : 0;

      const healthScore = calculateFinancialHealthScore(
        calculationType === 'goal' ? calculationResult.requiredSIP : inputs.monthlySIP,
        inputs.monthlyIncome,
        calculationType === 'goal' ? inflationAdjustedGoal : calculationResult.futureValue,
        inputs.years,
        inputs.returnRate
      );

      setResults({
        requiredSIP: calculationResult.requiredSIP,
        futureValue: calculationResult.futureValue,
        totalInvestment: calculationResult.totalInvestment,
        totalReturns: calculationResult.totalReturns,
        inflationAdjustedGoal,
        financialHealthScore: healthScore,
      });

      setMonthlyData(calculationResult.monthlyData);

      const simulation = runMonteCarloSimulation(
        calculationType === 'goal' ? calculationResult.requiredSIP : inputs.monthlySIP,
        inputs.returnRate,
        15,
        inputs.years,
        100
      );

      setMonteCarloData(simulation.scenarios);
    } catch (error) {
      console.error('Error in calculations:', error);
    }
  }, [calculationType, inputs]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  return {
    calculationType,
    setCalculationType,
    inputs,
    updateInputs,
    results,
    monthlyData,
    monteCarloData,
  };
};
