import React, { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import PreviewProject from "../components/PreviewProject";
import Alert from "../components/Alert";
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
      <h1 className="text-3xl font-black mt-10 mx-10 text-center">Proyectos</h1>
      {message && <Alert alert={alert} />}
      <div className="bg-white shadow mt-10 rounded-lg lg:mx-10">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5">
            No hay proyectos
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
