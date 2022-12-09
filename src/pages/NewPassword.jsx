import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import Logo from "../assets/images/logo-transparent.png";

const NewPassword = () => {
  const [tokenValid, setTokenValid] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [password, setPassword] = useState("");
  const params = useParams();
  const { token } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        message: "El password debe tener 6 caracteres como mínimo",
        error: true,
      });
      return;
    }

    try {
      const url = `http://localhost:4000/api/users/reset-password/${token}`;
      const { data } = await axios.post(url, { password });
      setAlert({
        message: data.message,
        error: false,
      });
      setPasswordChanged(true);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios(`http://localhost:4000/api/users/reset-password/${token}`);
        setTokenValid(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true,
        });
      }
    };
    validateToken();
  }, []);

  const { message } = alert;
  return (
    <>
      <Link to={"/"} className="flex justify-center">
        <img src={Logo} alt="Logotipo" className="w-7/12" />
      </Link>
      <h2 className="font-semibold text-xl uppercase text-center mt-10">
        Restablecer mi contraseña
      </h2>
      {message && <Alert alert={alert} />}
      {tokenValid && (
        <form
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          {message && <Alert alert={alert} />}
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-lg font-semibold"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>
          <input
            type="submit"
            value={"Guardar"}
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordChanged && (
        <Link
          to={"/"}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
