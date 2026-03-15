# Goal-Based SIP Calculator

## Project Description
A web application that helps users plan and track their Systematic Investment Plans (SIPs). It offers goal-based calculations, rich visualizations, and AI-powered insights so beginners and seasoned investors can understand projected outcomes quickly.

## Key Features
- **Goal-based SIP calculation**: Plan monthly contributions against future goals with inflation awareness.
- **Investment growth visualization**: Year-by-year growth with principal vs. returns.
- **Performance charts**: Area, pie, and scenario charts (Monte Carlo) for clear comparisons.
- **AI-powered financial insights**: Contextual tips generated from your inputs.
- **Easy-to-use input forms**: Sliders, selectors, and tabs keep data entry simple.
- **Clean, responsive UI**: Works smoothly across devices.

📸 Screenshots

Dashboard

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img2.jpeg)

Description:
Investment calculations are based on inputs and projected rates, and actual returns may vary. This is not financial advice.

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img3.jpeg)

Description: Pie chart showing principal (44%) vs returns (56%) with monetary values, helping users visualize investment growth in the Goal-Based SIP Calculator.

Smart Investment Planner Dashboard

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img4.jpeg) 

Description:
A fintech web app dashboard comparing SIP vs Lump Sum investments, showing total investment, future value, returns, and powered financial insights to help users plan their financial goals. 📊💰

Investment Delay Impact Calculator

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img5.jpeg)

A fintech dashboard showing the cost of delaying investments, comparing starting now vs starting later. It highlights potential wealth loss due to delayed investing and provides financial insights to help users make smarter investment decisions. 📊💰

📊 Goal Achievement Tracker – Investment Milestones

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img6.jpeg)

Description:
A fintech dashboard showing investment milestones progress, where goals from ₹1 Lakh to ₹50 Lakh are achieved and the ₹1 Crore target is 87% completed, with financial insights guiding users to reach their financial goals faster. 💰📈

![Alt text](https://github.com/Soundharyasankar/SIP_Calculator/blob/main/img7.jpeg)
## Technologies Used
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- Radix UI components
- Hugging Face Inference API (for AI insights)

## Project Structure
```
src/
  components/       // UI building blocks (forms, charts, layout, insights, analysis)
  pages/            // Page-level views
  hooks/            // Custom React hooks (e.g., investment calculator state)
  services/         // API clients (e.g., Hugging Face)
  utils/            // Calculation helpers and formatters
  types/            // Shared TypeScript types
  styles/           // Global styles and theme files
```

## How to Run the Project Locally
```bash
npm install
npm run dev
```
Then open the printed local URL in your browser.

## Video
https://drive.google.com/file/d/1q_uGed3tP6lntf3RXM-MfZfSHF6nVQLU/view?usp=sharing

## Environment Variables Setup
1. Copy `.env.example` to `.env.local`.
2. Fill in your values:
   - `VITE_HUGGINGFACE_API_TOKEN` – Hugging Face access token.
   - `VITE_API_URL` – Inference endpoint URL.
3. Keep `.env.local` private; it’s ignored by git.

## Future Improvements
- Add downloadable PDF reports for projections.
- Provide multi-goal planning in a single dashboard.
- Enable currency and locale switching.
- Offer scenario presets (conservative / balanced / aggressive).

## Contributors
- MahaSelvan S
- Soundharya S
- Anitha S
