const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

export interface FinancialInsightRequest {
  sip: number;
  years: number;
  returnRate: number;
  inflationRate: number;
  goal: string;
  goalCost?: number;
}

const isApiConfigured = (): boolean => Boolean(API_URL && HUGGINGFACE_API_TOKEN);

export async function generateFinancialInsight(data: FinancialInsightRequest): Promise<string> {
  const prompt = `You are a financial education assistant helping users understand mutual fund investments.

The user has entered the following investment data:

Monthly SIP amount: ?${data.sip.toLocaleString('en-IN')}
Investment duration: ${data.years} years
Expected annual return: ${data.returnRate}%
Inflation assumption: ${data.inflationRate}%
Goal: ${data.goal}

Based on this information:

1. Explain the result in simple language.
2. Highlight the power of compounding.
3. Suggest one improvement to reach the goal faster.
4. Mention the effect of inflation on long-term goals.

Keep the explanation short (3–4 sentences) and educational.
Do not provide financial guarantees or investment recommendations.`;

  if (!isApiConfigured()) {
    console.warn('Hugging Face API credentials are missing');
    return generateFallbackInsight(data);
  }

  try {
    const response = await fetch(API_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (Array.isArray(result) && result[0]?.generated_text) {
      return result[0].generated_text.trim();
    }

    return generateFallbackInsight(data);
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return generateFallbackInsight(data);
  }
}

export async function generateFinancialCoaching(data: FinancialInsightRequest): Promise<string> {
  const prompt = `You are an AI financial coach.

Analyze the user's investment plan and provide actionable insights.

User inputs:

Monthly SIP: ?${data.sip.toLocaleString('en-IN')}
Investment duration: ${data.years} years
Expected return: ${data.returnRate}%
Inflation: ${data.inflationRate}%
${data.goalCost ? `Goal cost: ?${data.goalCost.toLocaleString('en-IN')}` : ''}

Provide:

• One suggestion to reach the goal earlier
• One warning about inflation or risk
• One educational tip about long-term investing

Write the response in simple investor-friendly language.
Limit response to 3 bullet points.`;

  if (!isApiConfigured()) {
    console.warn('Hugging Face API credentials are missing');
    return generateFallbackCoaching(data);
  }

  try {
    const response = await fetch(API_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (Array.isArray(result) && result[0]?.generated_text) {
      return result[0].generated_text.trim();
    }

    return generateFallbackCoaching(data);
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return generateFallbackCoaching(data);
  }
}

function generateFallbackInsight(data: FinancialInsightRequest): string {
  const futureValue = data.sip * 12 * data.years * Math.pow(1 + data.returnRate / 100, data.years);
  const inflationImpact = (1 - Math.pow(1 + data.inflationRate / 100, data.years)) * 100;

  return `Your monthly SIP of ?${data.sip.toLocaleString('en-IN')} can grow significantly over ${data.years} years due to compounding. Increasing your SIP by 10-15% annually could help you reach your goal faster. Inflation may reduce purchasing power by approximately ${Math.abs(inflationImpact).toFixed(1)}% over this period, so plan ahead.`;
}

function generateFallbackCoaching(data: FinancialInsightRequest): string {
  const increment = Math.round(data.sip * 0.3);
  const earlyYears = Math.round(data.years * 0.15);

  return `• Increasing your SIP by ?${increment.toLocaleString('en-IN')} could help you reach your goal nearly ${earlyYears} years earlier.
• Inflation at ${data.inflationRate}% may increase the cost of your goal significantly over time.
• Long-term investing benefits from compounding, so consistency and patience are key to success.`;
}
