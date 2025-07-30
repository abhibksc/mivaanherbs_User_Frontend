const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get token and attach headers
const authFetch = async (url) => {
  const token = localStorage.getItem("token"); // or your token key
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchWalletDetails = () => {
  return authFetch(`${BASE_URL}/user/getWalletDetails`);
};

export const fetchDirectSponsorIncome = () => {
  return authFetch(`${BASE_URL}/user/getDirectSponsorIncomeDetails`);
};

export const fetchFighterIncome = () => {
  return authFetch(`${BASE_URL}/user/getFighterIncomeDetails`);
};

export const fetchMatchingIncome = () => {
  return authFetch(`${BASE_URL}/user/getMatchingIncomeDetails`);
};

export const fetchIncomeLogs = () => {
  return authFetch(`${BASE_URL}/user/getAllIncomeLogs`);
};
