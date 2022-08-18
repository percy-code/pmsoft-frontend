import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const { auth, setAuth, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        message: "Todos los campos son obligatorios",
        error: true,
      });
    }

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("token", data.data.token);
      setAuth(data.data);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  const { message } = alert;
  return (
    <>
      <div className="flex justify-center">
        <img src={Logo} alt="" className="w-7/12" />
      </div>
      <h2 className="font-semibold text-xl uppercase text-center mt-10">
        Iniciar Sesión
      </h2>
      {message && <Alert alert={alert} />}
      <form
        action=""
        className="my-6 bg-white shadow rounded-lg px-10 py-5 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-lg font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-lg font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value={"Iniciar sesión"}
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/register"}
          className="block text-center my-5 text-slate-500 uppercase text-xs"
        >
          ¿No tienes una cuenta? <br />
          Regístrate
        </Link>
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
