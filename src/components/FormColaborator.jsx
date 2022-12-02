import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormColaborator = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      showAlert({
        message: "Debe ingresar un correo electrónico",
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  const { message } = alert;

  return (
    <form
      className="w-full bg-white pb-10 px-5 md:w-1/2 shadow"
      onSubmit={handleSubmit}
    >
      {message && <Alert alert={alert} />}
      <div className="mb-5 flex flex-col">
        <Input
          label="Correo del colaborador"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <input type="submit" value={"Buscar colaborador"} /> */}
      <Button type="submit" className="w-full lg:w-1/2">
        Buscar colaborador
      </Button>
    </form>
  );
};

export default FormColaborator;
