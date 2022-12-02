import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import Alert from "../components/Alert";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";

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
      {message && <Alert alert={alert} />}
      <form
        className="my-6 bg-white shadow rounded-lg px-10 py-5 pb-10"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="my-8 font-semibold text-xl uppercase text-center">
            Restablecer mi contraseña
          </h2>
          <Input
            label="Email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={"Restablecer contraseña"}
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <p className="block text-center my-5 text-slate-500 text-xs">
          ¿Ya tienes una cuenta?
          <Link to={"/"} className="block text-center text-slate-500 text-xs">
            Inicia sesión
          </Link>
        </p>
      </nav>
    </>
  );
};

export default RecoveryPassword;
