/**
 * Financial Calculation Utilities
 * Comprehensive functions for SIP calculations, Monte Carlo simulations, and financial modeling
 */

export interface SIPCalculationResult {
  totalInvestment: number;
  futureValue: number;
  totalReturns: number;
  requiredSIP: number;
  monthlyData: MonthlyData[];
  inflationAdjustedGoal: number;
}

export interface MonthlyData {
  month: number;
  investment: number;
  value: number;
}

export interface StepUpSIPResult extends SIPCalculationResult {
  finalMonthlySIP: number;
}

export interface MonteCarloResult {
  scenarios: number[][];
  bestCase: number;
  worstCase: number;
  medianCase: number;
  probability: number;
}

/**
 * Calculate future value of SIP with compound interest
 */
export function calculateSIPFutureValue(
  monthlySIP: number,
  annualReturnRate: number,
  years: number
): SIPCalculationResult {
  const months = years * 12;
  const monthlyRate = annualReturnRate / 12 / 100;
  
  let totalInvestment = 0;
  let futureValue = 0;
  const monthlyData: MonthlyData[] = [];

  for (let month = 1; month <= months; month++) {
    totalInvestment += monthlySIP;
    futureValue = (futureValue + monthlySIP) * (1 + monthlyRate);
    
    if (month % 12 === 0 || month === months) {
      monthlyData.push({
        month,
        investment: totalInvestment,
        value: futureValue,
      });
    }
  }

  const totalReturns = futureValue - totalInvestment;

  return {
    totalInvestment,
    futureValue,
    totalReturns,
    requiredSIP: monthlySIP,
    monthlyData,
    inflationAdjustedGoal: 0,
  };
}

/**
 * Calculate required SIP to achieve a goal with inflation adjustment
 */
export function calculateRequiredSIP(
  goalAmount: number,
  years: number,
  annualReturnRate: number,
  inflationRate: number
): SIPCalculationResult {
  // Adjust goal for inflation
  const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, years);
  
  const months = years * 12;
  const monthlyRate = annualReturnRate / 12 / 100;
  
  // Formula: FV = P × [(1 + r)^n - 1] / r × (1 + r)
  const requiredSIP = inflationAdjustedGoal / (
    (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate)
  );

  const result = calculateSIPFutureValue(requiredSIP, annualReturnRate, years);
  return {
    ...result,
    requiredSIP,
    inflationAdjustedGoal,
  };
}

/**
 * Calculate Step-up SIP with annual increment
 */
export function calculateStepUpSIP(
  initialSIP: number,
  annualIncrement: number,
  annualReturnRate: number,
  years: number
): StepUpSIPResult {
  const monthlyRate = annualReturnRate / 12 / 100;
  const incrementFactor = 1 + annualIncrement / 100;
  
  let totalInvestment = 0;
  let futureValue = 0;
  let currentSIP = initialSIP;
  const monthlyData: MonthlyData[] = [];

  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      totalInvestment += currentSIP;
      futureValue = (futureValue + currentSIP) * (1 + monthlyRate);
      
      const totalMonth = year * 12 + month + 1;
      if (totalMonth % 12 === 0 || totalMonth === years * 12) {
        monthlyData.push({
          month: totalMonth,
          investment: totalInvestment,
          value: futureValue,
        });
      }
    }
    currentSIP *= incrementFactor;
  }

  const totalReturns = futureValue - totalInvestment;

  return {
    totalInvestment,
    futureValue,
    totalReturns,
    requiredSIP: initialSIP,
    monthlyData,
    inflationAdjustedGoal: 0,
    finalMonthlySIP: currentSIP / incrementFactor,
  };
}

/**
 * Calculate lump sum future value
 */
export function calculateLumpSum(
  principal: number,
  annualReturnRate: number,
  years: number
): number {
  return principal * Math.pow(1 + annualReturnRate / 100, years);
}

/**
 * Monte Carlo simulation for market uncertainty
 */
export function runMonteCarloSimulation(
  monthlySIP: number,
  expectedReturn: number,
  volatility: number,
  years: number,
  simulations: number = 1000
): MonteCarloResult {
  const months = years * 12;
  const scenarios: number[][] = [];
  const finalValues: number[] = [];

  for (let sim = 0; sim < simulations; sim++) {
    let value = 0;
    const scenario: number[] = [];

    for (let month = 0; month < months; month++) {
      // Random return with normal distribution approximation
      const randomReturn = (expectedReturn / 12 / 100) + 
        (volatility / 100 / Math.sqrt(12)) * (Math.random() - 0.5) * 2.5;
      
      value = (value + monthlySIP) * (1 + randomReturn);
      
      if (month % 12 === 0 || month === months - 1) {
        scenario.push(value);
      }
    }
    
    scenarios.push(scenario);
    finalValues.push(value);
  }

  finalValues.sort((a, b) => a - b);

  return {
    scenarios: scenarios.slice(0, 50), // Return first 50 for visualization
    bestCase: finalValues[Math.floor(simulations * 0.95)],
    worstCase: finalValues[Math.floor(simulations * 0.05)],
    medianCase: finalValues[Math.floor(simulations * 0.5)],
    probability: 0.95,
  };
}

/**
 * Calculate delay impact on investment
 */
export function calculateDelayImpact(
  monthlySIP: number,
  annualReturnRate: number,
  years: number,
  delayYears: number
): { onTime: number; delayed: number; loss: number } {
  const onTime = calculateSIPFutureValue(monthlySIP, annualReturnRate, years).futureValue;
  const delayed = calculateSIPFutureValue(monthlySIP, annualReturnRate, years - delayYears).futureValue;
  
  return {
    onTime,
    delayed,
    loss: onTime - delayed,
  };
}

/**
 * Calculate financial health score (0-100)
 */
export function calculateFinancialHealthScore(
  monthlySIP: number,
  monthlyIncome: number,
  goalAmount: number,
  years: number,
  annualReturnRate: number
): number {
  // Factor 1: Investment to income ratio (30 points)
  const sipRatio = (monthlySIP / monthlyIncome) * 100;
  const sipScore = Math.min((sipRatio / 20) * 30, 30); // Ideal: 20% of income

  // Factor 2: Goal achievability (40 points)
  const projected = calculateSIPFutureValue(monthlySIP, annualReturnRate, years).futureValue;
  const achievability = (projected / goalAmount) * 100;
  const goalScore = Math.min((achievability / 100) * 40, 40);

  // Factor 3: Time horizon (20 points)
  const timeScore = Math.min((years / 20) * 20, 20); // Ideal: 20+ years

  // Factor 4: Return expectation (10 points)
  const returnScore = (annualReturnRate >= 10 && annualReturnRate <= 15) ? 10 : 5;

  return Math.round(sipScore + goalScore + timeScore + returnScore);
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with Indian number system
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(num));
}