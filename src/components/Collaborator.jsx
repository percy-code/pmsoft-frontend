import { Button } from "@material-tailwind/react";
import React from "react";
import useProjects from "../hooks/useProjects";

const Collaborator = ({ collaborator }) => {
  const { name, email } = collaborator;
  const { handleModalDeleteCollaborator } = useProjects();
  return (
    <div className="border-b-2 pb-4 border-b-gray-600 flex gap-4 justify-between items-center mt-4 lg:flex-row mb-4">
      <div className="w-full">
        <p>{name}</p>
        <p className="text-gray-700 text-xs">{email}</p>
      </div>
      <div className="w-full md:w-4/12">
        <Button
          type="button"
          size="sm"
          color="red"
          onClick={() => handleModalDeleteCollaborator(collaborator)}
          className="w-full text-xs"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Collaborator;
