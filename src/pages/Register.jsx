import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Logo from "../assets/images/logo-transparent.png";
import clientAxios from "../config/clientAxios";
import { Input, Button } from "@material-tailwind/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password != repeatPassword) {
      setAlert({
        message: "No coinciden las contraseñas",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: "La contraseña es muy corta. Agrega mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlert({});

    // Create User
    try {
      const { data } = await clientAxios.post("/users", {
        name,
        email,
        password,
      });
      setAlert({
        message: data.message,
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      setAlert({
        message: error.response.data,
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
        <div className="flex flex-col gap-2">
          <h2 className="my-8 font-semibold text-xl uppercase text-center">
            Regístrate
          </h2>
          <Input
            label="Nombre"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repetir contraseña"
            id="password2"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </div>
      </form>

      <nav className="lg:flex lg:justify-between">
        <p className="block text-center my-5 text-slate-500 text-xs">
          ¿Ya tienes una cuenta?
          <Link to={"/"} className="block text-center text-slate-500 text-xs">
            Inicia sesión
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

export default Register;
