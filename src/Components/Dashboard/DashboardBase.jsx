import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardBase = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  

useEffect(()=>{

if(!token){
navigate("/authentication")
}

},[])





  return (
  <div className="w-full ">
      <Outlet /> {/* This renders WalletPage when path is /dashboard/wallet */}
  </div>
  );
};
export default DashboardBase;
