import { Outlet } from "react-router-dom";

const DashboardBase = () => {
  return (
<div className="w-full p-4  md:pt-4">

      <Outlet /> {/* This renders WalletPage when path is /dashboard/wallet */}
    </div>
  );
};
export default DashboardBase;
