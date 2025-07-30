import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardBase from "./DashboardBase";
import WalletPage from "./WalletPage/WalletPage";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome/DashboardHome";
import DirectSponsorIncomePage from "./DirectSponsorIncome/DirectSponsorIncomePage";
import FighterIncomePage from "./FighterIncomePage/FighterIncomePage";
import MatchingIncomePage from "./MatchingIncomePage/MatchingIncomePage";
import AllIncomeLogsPage from "./AllIncomeLogsPage/AllIncomeLogsPage";

const DashboardRouting = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardBase/>}>
          <Route index element={<DashboardHome />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="directSponsor" element={<DirectSponsorIncomePage />} />
          <Route path="fighterIncome" element={<FighterIncomePage />} />
          <Route path="matchingIncome" element={<MatchingIncomePage />} />
          <Route path="incomeLogs" element={<AllIncomeLogsPage />} />




        </Route>
      </Routes>
    </div>
  );
};

export default DashboardRouting;
