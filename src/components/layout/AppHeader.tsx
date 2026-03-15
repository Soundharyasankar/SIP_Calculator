import { TrendingUp } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-[#224c87] text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="bg-white p-2 rounded-lg">
          <TrendingUp className="w-8 h-8 text-[#da3832]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">Goal-Based SIP Calculator</h1>
          <p className="text-sm text-blue-100 mt-1">Plan your investments with AI-powered insights</p>
        </div>
      </div>
    </header>
  );
}
