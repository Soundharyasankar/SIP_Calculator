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
