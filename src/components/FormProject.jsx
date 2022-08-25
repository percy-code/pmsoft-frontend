import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateDelivery, setDateDelivery] = useState("");
  const [client, setClient] = useState("");

  const { showAlert, submitProject, alert } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, description, dateDelivery, client].includes("")) {
      showAlert({
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Pass data to the provider
    await submitProject({ name, description, dateDelivery, client });

    // Reset Form
    setName("");
    setDescription("");
    setDateDelivery("");
    setClient("");
  };

  const { message } = alert;

  return (
    <form
      action=""
      className="bg-white py-8 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {message && <Alert alert={alert} />}
      {/* Name */}
      <div className="">
        <Input
          label="Nombre del Proyecto"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* Description */}
      <div className="mt-4">
        <Textarea
          label="Descripción"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Date Delivery */}
      <div className="mt-4">
        <Input
          label="Fecha de Entrega"
          type={"date"}
          id={"date-delivery"}
          value={dateDelivery}
          onChange={(e) => setDateDelivery(e.target.value)}
        />
      </div>
      {/* Client */}
      <div className="mt-4">
        <Input
          label="Nombre del Cliente"
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <Button className="mt-4 mx-auto w-full" type="submit">
        Button
      </Button>
    </form>
  );
};

export default FormProject;
