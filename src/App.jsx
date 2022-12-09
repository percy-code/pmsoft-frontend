import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoveryPassword from "./pages/RecoveryPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewColaborator from "./pages/NewColaborator";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              {/* <Route path="register" element={<Register />} /> */}
              <Route path="recovery-password" element={<RecoveryPassword />} />
              <Route
                path="recovery-password/:token"
                element={<NewPassword />}
              />
              <Route
                path="confirm-account/:token"
                element={<ConfirmAccount />}
              />
            </Route>
            <Route path="/projects" element={<ProtectedRoutes />}>
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path="new-colaborator/:id" element={<NewColaborator />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
