import React from "react";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();
  return (
    <>
      <h1>Proyectos</h1>
      <div></div>
    </>
  );
};

export default Projects;
