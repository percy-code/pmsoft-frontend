import React from "react";
import useProjects from "../hooks/useProjects";
import PreviewProject from "../components/PreviewProject";
const Projects = () => {
  const { projects } = useProjects();
  return (
    <>
      <h1 className="text-3xl font-black mt-10 mx-10">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg mx-10">
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
