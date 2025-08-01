import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const ReferAndEarnPage = () => {
     const sponsorId = localStorage.getItem('MYsponsor_id');
  const referralLink = `${window.location.origin}/authentication/ref/${sponsorId}`;



  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-indigo-700">🎉 Refer & Earn</h1>
        <p className="text-gray-600 mt-2">
          Share your referral link and earn rewards every time someone joins using your link!
        </p>
      </div>

      {/* Referral Link Box */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg border border-indigo-200">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full sm:w-auto flex-1 bg-transparent text-gray-800 font-medium px-2 py-1 outline-none"
        />
        <button
          onClick={handleCopy}
          className="mt-3 sm:mt-0 sm:ml-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>

      {/* Awesome Perks Section */}
      <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
        <h2 className="text-xl font-semibold text-indigo-600 mb-3">Why Refer?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>💰 Get <strong>Direct Sponsor Income</strong> instantly when your friend joins!</li>
          <li>📈 Grow your <strong>MLM Network</strong> and boost your left/right BV.</li>
          <li>🏆 Be eligible for <strong>Matching & Fighter Income</strong> bonuses.</li>
          <li>🎁 Unlock future bonuses, discounts & early access to features.</li>
        </ul>
      </div>

      {/* Footer text */}
      <div className="text-center text-sm text-gray-500 mt-6">
        Keep referring and keep earning. Build your network, grow your income. 🚀
      </div>
    </div>
  );
};

export default ReferAndEarnPage;
