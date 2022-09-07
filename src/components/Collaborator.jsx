import { Button } from "@material-tailwind/react";
import React from "react";
import useProjects from "../hooks/useProjects";

const Collaborator = ({ collaborator }) => {
  const { name, email } = collaborator;
  const { handleModalDeleteCollaborator } = useProjects();
  return (
    <div className="border-b flex justify-between items-center mt-4">
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <div>
        <Button
          type="button"
          color="red"
          onClick={() => handleModalDeleteCollaborator(collaborator)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Collaborator;
