import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import { Button, Input } from "@material-tailwind/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const { auth, setAuth, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        message: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("token", data.data.token);
      setAuth(data.data);

      // Redirect to Projects Page
      navigate("/projects");
    } catch (error) {
      setAlert({
        message: error.response.data.data,
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }
  };

  const { message } = alert;
  return (
    <>
      <div className="flex justify-center">
        <img src={Logo} alt="" className="w-7/12" />
      </div>

      <form
        className="my-6 bg-white shadow rounded-lg px-10 py-5 pb-10"
        onSubmit={handleSubmit}
      >
        {message && <Alert alert={alert} />}
        <div>
          <h2 className="my-8 font-semibold text-xl uppercase text-center">
            Iniciar Sesión
          </h2>
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit">
          Iniciar sesión
        </Button>
      </form>
      <nav className="lg:flex lg:justify-between">
        <p className="block text-center my-5 text-slate-500 text-xs">
          ¿Aún no tienes una cuenta?{" "}
          <Link
            to={"/register"}
            className="block text-center text-slate-500 text-xs"
          >
            Regístrate
          </Link>
        </p>

        <Link
          to={"/recovery-password"}
          className="block text-center my-5 text-slate-500 uppercase text-xs"
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
