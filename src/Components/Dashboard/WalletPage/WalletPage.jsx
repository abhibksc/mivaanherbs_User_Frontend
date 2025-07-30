import React, { useEffect, useState } from 'react';
import { fetchWalletDetails } from '../../Api/userService';

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetchWalletDetails().then(setWallet);
  }, []);

  if (!wallet) return <p className="text-center mt-10 text-gray-600">Loading Wallet...</p>;

  return (
    <div className="p-6  mx-auto bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Wallet Summary</h2>

      <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded mb-6">
        Current Balance: ₹{wallet.wallet_balance}
      </div>

      <h3 className="text-xl font-semibold mb-3">Transaction History</h3>

      {wallet.transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {wallet.transactions.map((txn) => (
            <div key={txn._id} className="border border-gray-200 rounded p-4 shadow-sm">
              <p><strong>Package Amount:</strong> ₹{txn.package_amount?.$numberDecimal || 0}</p>
              <p><strong>DP:</strong> ₹{txn.dp?.$numberDecimal || 0}</p>
              <p><strong>BV:</strong> {txn.bv?.$numberDecimal || 0}</p>
              <p><strong>Payment Ref:</strong> {txn.payment_ref}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 font-medium ${txn.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.status}
                </span>
              </p>
              <p><strong>Date:</strong> {new Date(txn.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletPage;
