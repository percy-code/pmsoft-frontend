import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const confirmAccount = async () => {
    // TODO: with the useeffect it renders twice
    // Temporary solution: disable strictemode

    try {
      const url = `/users/confirm/${token}`;
      const { data } = await clientAxios.get(url);

      setAccountConfirmed(true);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  useEffect(() => {
    confirmAccount().then();
  }, []);

  const { message } = alert;

  return (
    <>
      <h1 className="font-semibold text-5xl text-center">PMSOFT</h1>
      <h2 className="text-center mt-3">Confirma tu cuenta</h2>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* {message && <Alert alert={alert} />} */}
        {accountConfirmed ? (
          <>
            <div className="from-sky-400 to-sky-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase font-bold text-sm my-10">
              <p>Tu cuenta ha sido confirmada</p>
            </div>
            <Link
              to={"/"}
              className="block text-center my-5 text-slate-500 uppercase text-sm"
            >
              Inicia sesión
            </Link>
          </>
        ) : (
          <Alert alert={alert} />
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
