import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormColaborator = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      showAlert({
        message: "El email es obligatorio",
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  const { message } = alert;

  return (
    <form
      action=""
      className="bg-white py-10 px-5 md:w-1/2 shadow"
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
      <Button type="submit">Buscar colaborador</Button>
    </form>
  );
};

export default FormColaborator;
