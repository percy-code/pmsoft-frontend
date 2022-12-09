import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import PreviewProject from "../components/PreviewProject";
import Alert from "../components/Alert";
import { Button } from "@material-tailwind/react";
// import io from "socket.io-client";

// let socket;

const Projects = () => {
  const { projects, alert } = useProjects();
  const { message } = alert;

  useEffect(() => {
    // Open connection to Server SocketIO
    // socket = io(import.meta.env.VITE_BACKEND_URL);
    // socket.emit("test", "Percy");
    // socket.on("response", (response) => {
    //   console.log("Response from Server", response);
    // });
  });

  return (
    <>
      <h1 className="text-xl font-black mt-10 text-center uppercase">
        Proyectos
      </h1>
      {message && <Alert alert={alert} />}
      <div>
        {projects.length ? (
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:mx-10 xl:grid-cols-3 3xl:grid-cols-4 2xl:mx-40">
            {projects.map((project) => (
              <PreviewProject key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="mt-5 text-center text-gray-600">
              Aún no tienes proyectos creados
            </p>
            <Link to={"/projects/new-project"} className="my-4">
              <Button>Crear proyecto</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
