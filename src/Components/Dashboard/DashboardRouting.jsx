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
import Profile from "./Profile/Profile";
import ReferAndEarnPage from "./ReferEarnPage/ReferEarnPage";
import IncomePage from "./IncomePage/IncomePage";
import TeamSection from "./TeamSection/TeamSection";
import MyTeam from "./TeamSection/MyTeam";
import MyGeology from "./TeamSection/MyGeology";
import KYC from "./Profile/KYC";
import DownlineTree from "./Activation/DownlineTree";
import ActivateProductPage from "./Activation/ActivateProductPage";

const DashboardRouting = () => {
  return (
  <div className="flex flex-col md:flex-row w-full min-h-screen">
    
  <Sidebar />
  
  <div className="flex-1 mt-16 md:mt-0 p-4">
    <Routes>
      <Route path="/" element={<DashboardBase />}>
        <Route index element={<DashboardHome />} />
        <Route path="Orderfund" element={<WalletPage />} />
        <Route path="userList" element={<DownlineTree />} />
        <Route path="Orderfund" element={<WalletPage />} />

        <Route path="/activate-product/:userId" element={<ActivateProductPage />} />


        <Route path="my-team" element={<MyTeam />} />
        <Route path="mygeo" element={<MyGeology />} />



        <Route path="incomeLogs" element={<IncomePage />} />
        <Route path="myteam" element={<TeamSection />} />
        <Route path="kyc" element={<KYC />} />

        {/* kyc */}




        <Route path="directSponsor" element={<DirectSponsorIncomePage />} />
        <Route path="fighterIncome" element={<FighterIncomePage />} />
        <Route path="matchingIncome" element={<MatchingIncomePage />} />
        <Route path="incomeLogs" element={<AllIncomeLogsPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reffer&earn" element={<ReferAndEarnPage />} />


      </Route>
    </Routes>
  </div>
</div>
  );
};

export default DashboardRouting;
