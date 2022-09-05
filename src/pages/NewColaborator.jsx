import React, { useEffect } from "react";
import FormColaborator from "../components/FormColaborator";

import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Alert from "../components/Alert";

const NewColaborator = () => {
  const {
    getOneProject,
    project,
    loading,
    collaborator,
    addCollaborator,
    alert,
  } = useProjects();
  const params = useParams();

  useEffect(() => {
    getOneProject(params.id);
  }, []);

  if (!project._id) return <Alert alert={alert} />;
  return (
    <>
      <h1 className="mt-10 text-center font-3xl font-bold">
        Añadir colaborador(a) al proyecto: {project.name}
      </h1>
      <div className="mt-10 flex justify-center items-center">
        <FormColaborator />
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        collaborator._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p>{collaborator.name}</p>
                <Button
                  onClick={() =>
                    addCollaborator({
                      email: collaborator.email,
                    })
                  }
                >
                  Agregar al proyecto
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewColaborator;
