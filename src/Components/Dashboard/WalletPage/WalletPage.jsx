import React, { useEffect, useState } from 'react';
import { fetchWalletDetails } from '../../Api/userService';

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetchWalletDetails().then(setWallet);
  }, []);

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-gray-500 text-lg font-medium">Loading Wallet...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">💼 Wallet Summary</h2>

        <div className="bg-slate-800 text-white text-lg sm:text-xl font-semibold px-5 py-4 rounded-xl mb-8 shadow">
          Current Balance: ₹{wallet.wallet_balance}
        </div>

        <h3 className="text-xl font-semibold text-slate-700 mb-4">📄 Transaction History</h3>

        {wallet.transactions.length === 0 ? (
          <p className="text-slate-500">No transactions found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wallet.transactions.map((txn) => (
              <div
                key={txn._id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                  <p><strong>Package Amount:</strong> ₹{txn.package_amount?.$numberDecimal || 0}</p>
                  <p><strong>DP:</strong> ₹{txn.dp?.$numberDecimal || 0}</p>
                  <p><strong>BV:</strong> {txn.bv?.$numberDecimal || 0}</p>
                  <p><strong>Payment Ref:</strong> {txn.payment_ref}</p>
                  <p className="flex items-center">
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 inline-block px-2 py-0.5 text-sm rounded-full font-medium ${
                        txn.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </p>
                  <p><strong>Date:</strong> {new Date(txn.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
