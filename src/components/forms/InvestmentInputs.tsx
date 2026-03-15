import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CalculationType, InvestmentInput } from '../../types/investment';
import { formatCurrency, formatNumber } from '../../utils/financialCalculations';

interface InvestmentInputsProps {
  values: InvestmentInput;
  calculationType: CalculationType;
  onChange: (values: Partial<InvestmentInput>) => void;
  onCalculationTypeChange: (type: CalculationType) => void;
}

const COMMON_GOALS = [
  'Retirement Planning',
  'Child Education Fund',
  'Home Purchase (Down Payment)',
  'Dream House Construction',
  "Daughter's Wedding",
  "Son's Wedding",
  'Child Higher Education Abroad',
  'Emergency Fund Creation',
  'Car Purchase',
  'Luxury Vehicle',
  'World Tour/Vacation',
  'Debt Repayment',
  'Start a Business',
  'Buy Investment Property',
  'Medical Emergency Fund',
  "Children's Marriage Fund",
  'College Education Fund',
  'Study Abroad Fund',
  'Grandchildren Education',
  'Buy Farmland',
  'Buy Commercial Property',
  'Buy Second Home',
  'Home Renovation',
  'Home Interior Design',
  'Buy Plot/Land',
  'Wealth Creation',
  'Early Retirement',
  'Post-Retirement Corpus',
  'Family Vacation Home',
  'Buy Gold/Jewelry',
  'Pilgrimage/Religious Trip',
  'Adventure Sports Fund',
  'Hobby Development',
  'Luxury Lifestyle',
  'Social Security Fund',
  'Healthcare Expenses',
  'Parent Care Fund',
  'Down Payment for Flat',
  'Villa Purchase',
  'Investment Portfolio',
  "Children's Future",
  'Financial Independence',
  'Tax Saving Investment',
  'Side Business Fund',
  'Startup Capital',
  'Asset Acquisition',
  'Charity/Donation Fund',
  'Family Security',
  'Legacy Building',
  'Other (Custom Goal)',
];

export function InvestmentInputs({
  values,
  calculationType,
  onChange,
  onCalculationTypeChange,
}: InvestmentInputsProps) {
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  useEffect(() => {
    const goalExists = COMMON_GOALS.includes(values.goalName);
    if (!goalExists && values.goalName) {
      setIsCustomGoal(true);
      setSelectedGoal('Other (Custom Goal)');
    } else {
      setIsCustomGoal(false);
      setSelectedGoal(values.goalName);
    }
  }, [values.goalName]);

  const handleChange = (field: keyof InvestmentInput, value: string | number) => {
    onChange({ [field]: value });
  };

  const handleGoalSelection = (goal: string) => {
    setSelectedGoal(goal);
    if (goal === 'Other (Custom Goal)') {
      setIsCustomGoal(true);
      handleChange('goalName', '');
    } else {
      setIsCustomGoal(false);
      handleChange('goalName', goal);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg border-none">
      <Tabs value={calculationType} onValueChange={(v) => onCalculationTypeChange(v as CalculationType)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="sip" className="data-[state=active]:bg-[#224c87] data-[state=active]:text-white">
            Calculate Returns
          </TabsTrigger>
          <TabsTrigger value="goal" className="data-[state=active]:bg-[#224c87] data-[state=active]:text-white">
            Plan for Goal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="space-y-6 mt-0">
          <div className="space-y-2">
            <Label htmlFor="goalNameSelect" className="text-[#224c87]">Investment Goal</Label>
            <Select value={selectedGoal} onValueChange={handleGoalSelection}>
              <SelectTrigger className="w-full border-gray-300 focus:border-[#224c87] focus:ring-[#224c87]">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {COMMON_GOALS.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isCustomGoal && (
              <Input
                id="customGoalName"
                value={values.goalName || ''}
                onChange={(e) => handleChange('goalName', e.target.value)}
                placeholder="Enter your custom goal"
                className="border-gray-300 focus:border-[#224c87] focus:ring-[#224c87] mt-2"
              />
            )}
            {isCustomGoal && !values.goalName && (
              <p className="text-xs text-gray-500 mt-1">
                Please enter your custom financial goal
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="monthlySIP" className="text-[#224c87]">Monthly SIP Amount</Label>
              <span className="text-sm font-semibold text-[#da3832]">{formatCurrency(values.monthlySIP || 0)}</span>
            </div>
            <Slider
              id="monthlySIP"
              min={500}
              max={100000}
              step={500}
              value={[values.monthlySIP || 500]}
              onValueChange={(val) => handleChange('monthlySIP', val[0])}
              className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>?500</span>
              <span>?1,00,000</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goal" className="space-y-6 mt-0">
          <div className="space-y-2">
            <Label htmlFor="goalNameGoalSelect" className="text-[#224c87]">Investment Goal</Label>
            <Select value={selectedGoal} onValueChange={handleGoalSelection}>
              <SelectTrigger className="w-full border-gray-300 focus:border-[#224c87] focus:ring-[#224c87]">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {COMMON_GOALS.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isCustomGoal && (
              <Input
                id="customGoalNameGoal"
                value={values.goalName || ''}
                onChange={(e) => handleChange('goalName', e.target.value)}
                placeholder="Enter your custom goal"
                className="border-gray-300 focus:border-[#224c87] focus:ring-[#224c87] mt-2"
              />
            )}
            {isCustomGoal && !values.goalName && (
              <p className="text-xs text-gray-500 mt-1">
                Please enter your custom financial goal
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="goalCost" className="text-[#224c87]">Goal Cost (Today's Value)</Label>
              <span className="text-sm font-semibold text-[#da3832]">{formatCurrency(values.goalCost || 0)}</span>
            </div>
            <Slider
              id="goalCost"
              min={100000}
              max={10000000}
              step={50000}
              value={[values.goalCost || 100000]}
              onValueChange={(val) => handleChange('goalCost', val[0])}
              className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>?1L</span>
              <span>?1Cr</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="years" className="text-[#224c87]">Investment Duration (Years)</Label>
            <span className="text-sm font-semibold text-[#da3832]">{values.years || 0} years</span>
          </div>
          <Slider
            id="years"
            min={1}
            max={30}
            step={1}
            value={[values.years || 1]}
            onValueChange={(val) => handleChange('years', val[0])}
            className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="returnRate" className="text-[#224c87]">Expected Return (%)</Label>
            <span className="text-sm font-semibold text-[#da3832]">{values.returnRate || 0}%</span>
          </div>
          <Slider
            id="returnRate"
            min={1}
            max={20}
            step={0.5}
            value={[values.returnRate || 1]}
            onValueChange={(val) => handleChange('returnRate', val[0])}
            className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1%</span>
            <span>20%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="inflationRate" className="text-[#224c87]">Inflation Rate (%)</Label>
            <span className="text-sm font-semibold text-[#da3832]">{values.inflationRate || 0}%</span>
          </div>
          <Slider
            id="inflationRate"
            min={2}
            max={10}
            step={0.5}
            value={[values.inflationRate || 2]}
            onValueChange={(val) => handleChange('inflationRate', val[0])}
            className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2%</span>
            <span>10%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="stepUpRate" className="text-[#224c87]">Annual Step-up (%)</Label>
            <span className="text-sm font-semibold text-[#da3832]">{values.stepUpRate || 0}%</span>
          </div>
          <Slider
            id="stepUpRate"
            min={0}
            max={20}
            step={1}
            value={[values.stepUpRate || 0]}
            onValueChange={(val) => handleChange('stepUpRate', val[0])}
            className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>20%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="monthlyIncome" className="text-[#224c87]">Monthly Income (Optional)</Label>
            <span className="text-sm font-semibold text-[#da3832]">?{formatNumber(values.monthlyIncome || 0)}</span>
          </div>
          <Slider
            id="monthlyIncome"
            min={10000}
            max={500000}
            step={5000}
            value={[values.monthlyIncome || 10000]}
            onValueChange={(val) => handleChange('monthlyIncome', val[0])}
            className="[&_[role=slider]]:bg-[#224c87] [&_[role=slider]]:border-[#224c87]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>?10K</span>
            <span>?5L</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
