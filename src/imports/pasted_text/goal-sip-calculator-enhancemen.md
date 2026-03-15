Act as a senior full-stack fintech engineer, AI developer, and product designer.

You are improving an existing Goal-Based SIP Calculator web application built using Next.js and TailwindCSS for a financial planning platform similar to HDFC Mutual Fund calculators.

Your goal is to enhance the application with better UI/UX, financial insights using Hugging Face AI, advanced financial simulations, and improved code structure while keeping the calculator educational, transparent, and investor-friendly.

------------------------------------------------

AI FINANCIAL INSIGHT GENERATOR (HUGGING FACE)

Integrate Hugging Face API to generate financial explanations for the calculator results.

Use the following prompt when calling the AI model:

"You are a financial education assistant helping users understand mutual fund investments.

The user has entered the following investment data:

Monthly SIP amount: {sip}
Investment duration: {years} years
Expected annual return: {returnRate}%
Inflation assumption: {inflationRate}%
Goal: {goal}

Based on this information:

1. Explain the result in simple language.
2. Highlight the power of compounding.
3. Suggest one improvement to reach the goal faster.
4. Mention the effect of inflation on long-term goals.

Keep the explanation short (3–4 sentences) and educational.
Do not provide financial guarantees or investment recommendations."

Example output:

Your monthly SIP of ₹5000 can grow significantly over time due to compounding.  
As returns accumulate, your investment begins generating returns on previous returns.  
Increasing your SIP slightly each year could help you reach your goal faster.  
Remember that inflation reduces purchasing power, so planning ahead is important.

------------------------------------------------

AI SMART FINANCIAL COACH

Add another Hugging Face prompt that generates optimization advice:

"You are an AI financial coach.

Analyze the user's investment plan and provide actionable insights.

User inputs:

Monthly SIP: {sip}
Investment duration: {years}
Expected return: {returnRate}
Inflation: {inflation}
Goal cost: {goalCost}

Provide:

• One suggestion to reach the goal earlier
• One warning about inflation or risk
• One educational tip about long-term investing

Write the response in simple investor-friendly language.
Limit response to 3 bullet points."

Example output:

• Increasing your SIP by ₹1500 could help you reach your goal nearly two years earlier.  
• Inflation may increase the cost of your goal significantly over time.  
• Long-term investing benefits from compounding, so consistency matters.

Display these insights in an “AI Financial Coach” section below the calculator results.

------------------------------------------------

UI / UX REDESIGN (FIGMA STYLE)

Redesign the UI for a financial investment calculator web application.

The application is a Goal-Based SIP Calculator built using Next.js and TailwindCSS.

Improve the UI to make it:

• clean  
• modern  
• investor-friendly  
• educational  

Follow HDFC Mutual Fund design language.

Brand colors:
Primary Blue #224c87  
Accent Red #da3832  
Neutral Grey #919090  

Fonts:
Montserrat  
Arial  
Verdana  

Design layout sections:

1. Header  
Logo + Calculator title

2. Input Panel  
Goal name  
Goal cost  
Years to goal  
Expected return  
Inflation rate  
Monthly SIP  

Use sliders and numeric inputs.

3. Results Panel  
Required SIP  
Future goal value  
Total investment  
Expected returns  

4. Visual Charts  
Investment growth chart  
Contribution vs returns chart  

5. AI Insight Section  
Display Hugging Face generated financial advice.

6. Disclaimer Section  
Display regulatory disclaimer.

Ensure layout is responsive for desktop, tablet, and mobile using modern fintech UI patterns with cards, soft shadows, and clean typography.

------------------------------------------------

FUNCTIONALITY ENHANCEMENTS

Improve the calculator by adding the following interactive components:

• SIP vs Lump Sum comparison  
• Step-up SIP slider  
• Inflation impact visualization  
• Scenario comparison for multiple SIP plans  
• Financial health score indicator  
• Goal progress tracker  

Include interactive graphs and real-time simulation sliders so users can instantly see how their investment plan changes.

------------------------------------------------

CODEBASE IMPROVEMENTS

Analyze the existing Next.js codebase and improve it by implementing the following:

1. Refactor financial calculation functions for accuracy and readability.
2. Create modular utility functions for financial formulas.
3. Improve chart rendering performance.
4. Add support for step-up SIP calculations.
5. Implement real-time slider updates for inputs.
6. Add an AI insights component using Hugging Face API.
7. Improve accessibility using semantic HTML and ARIA labels.
8. Ensure responsive design across desktop, tablet, and mobile devices.

Return updated code snippets and clearly explain the improvements.

------------------------------------------------

ADVANCED HACKATHON FEATURES

Enhance the financial calculator into an advanced investment simulator by adding:

• Monte Carlo simulation for market uncertainty  
• Behavioral finance simulator to show effects of delaying investments  
• Financial timeline visualization for long-term wealth growth  
• AI financial coach suggestions  
• Gamified goal progress tracker with milestone achievements  

Ensure all features remain educational and avoid presenting any results as guaranteed investment returns.

------------------------------------------------

FINAL OBJECTIVE

Transform the simple SIP calculator into a modern intelligent financial planning tool that combines:

financial education  
interactive visualization  
AI insights  
goal-based investment planning  
clean fintech UI design