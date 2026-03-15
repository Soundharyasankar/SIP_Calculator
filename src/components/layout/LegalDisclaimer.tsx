import { ShieldAlert } from 'lucide-react';
import { Card } from '../ui/card';

export function LegalDisclaimer() {
  return (
    <Card className="p-6 bg-white shadow-lg border-none">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 mt-1" />
        <div>
          <h3 className="font-semibold text-[#224c87] mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            This tool is for educational purposes only and does not constitute financial advice. Investment values are illustrative and can change based on market conditions. Consult a SEBI-registered advisor before making investment decisions.
          </p>
        </div>
      </div>
    </Card>
  );
}
