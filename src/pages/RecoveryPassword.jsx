import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import Alert from "../components/Alert";
import axios from "axios";

const RecoveryPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        message: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password`,
        { email }
      );
      setAlert({
        message: data.message,
        error: false,
      });
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
        Restablecer mi contraseña
      </h2>
      {message && <Alert alert={alert} />}
      <form
        action=""
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
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
            placeholder="Email de registro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value={"Restablecer contraseña"}
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/"}
          className="block text-center my-5 text-slate-500 uppercase text-xs"
        >
          ¿Ya tienes una cuenta? <br />
          Inicia sesión
        </Link>
        <Link
          to={"/register"}
          className="block text-center my-5 text-slate-500 uppercase text-xs"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default RecoveryPassword;
