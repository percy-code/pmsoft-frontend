import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Cargando...";
  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="bg-gray-300 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoutes;
