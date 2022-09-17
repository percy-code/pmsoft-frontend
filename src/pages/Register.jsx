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
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      //   {
      //     name,
      //     email,
      //     password,
      //   }
      // );
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
      // This is message error from Axios
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
      <h2 className="font-semibold text-xl uppercase text-center mt-10">
        Formulario de Registro
      </h2>
      {message && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="my-5">
            <label
              htmlFor="name"
              className="uppercase text-gray-600 block text-lg font-semibold"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <Input
              variant="static"
              label="Nombre"
              placeholder="Ingresa tu nombre"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
            {/* <Input
              label="Ingresa tu nombre"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
          </div>
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
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-lg font-semibold"
          >
            Repite tu contraseña
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Ingresa nuevamente tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {/* <input
          type="submit"
          value={"Registrarse"}
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        /> */}
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
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
