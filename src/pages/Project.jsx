import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpinnerLoading from "../components/SpinnerLoading";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { id } = params;
  const { getOneProject, project, loading } = useProjects();
  const { name } = project;

  useEffect(() => {
    getOneProject(id);
  }, []);

  return loading ? (
    <div className="bg-white shadow mt-10 rounded-lg mx-10 p-4 flex flex-1 justify-center">
      <SpinnerLoading />
    </div>
  ) : (
    <div className="bg-white shadow mt-10 rounded-lg mx-10 p-4">
      <h1 className="font-black text-3xl">{name}</h1>
    </div>
  );
};

export default Project;
