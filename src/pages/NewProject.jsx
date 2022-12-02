import React from "react";
import FormProject from "../components/FormProject";
import { Typography } from "@material-tailwind/react";

const NewProject = () => {
  return (
    <>
      <h1 className="text-xl font-black my-8 mx-10 text-center uppercase">
        Crear Nuevo Proyecto
      </h1>
      <div className="flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default NewProject;
