import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarMain from "../components/SidebarMain";

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Cargando...";
  return (
    <>
      {auth._id ? (
        <div className="md:flex md:min-h-screen">
          {/* <Sidebar /> */}
          <SidebarMain />
          <main className="bg-gray-100 flex-1">
            <Header />
            <div className="mx-3 pb-10 lg:mx-10">
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoutes;
