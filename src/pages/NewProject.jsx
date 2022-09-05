import React from "react";
import FormProject from "../components/FormProject";
import { Typography } from "@material-tailwind/react";

const NewProject = () => {
  return (
    <>
      <h1 className="text-center mt-10 text-2xl">Crear Nuevo Proyecto</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default NewProject;
