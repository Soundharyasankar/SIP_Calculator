export type CalculationType = 'sip' | 'goal';

export interface InvestmentInput {
  goalName: string;
  goalCost: number;
  years: number;
  returnRate: number;
  inflationRate: number;
  monthlySIP: number;
  stepUpRate: number;
  monthlyIncome: number;
}

export interface InvestmentResults {
  requiredSIP: number;
  futureValue: number;
  totalInvestment: number;
  totalReturns: number;
  inflationAdjustedGoal: number;
  financialHealthScore: number;
}
