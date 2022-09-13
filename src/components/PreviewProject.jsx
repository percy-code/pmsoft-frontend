import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, owner } = project;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-md">{name}</p>
        <span className="text-xs text-gray-500 uppercase">
          CLIENTE: {client}
        </span>
        {auth._id !== owner && (
          <p className="p-1 text-xs rounded-lg bg-green-500 font-bold text-white uppercase text-center w-1/2">
            Colaborador
          </p>
        )}
      </div>

      <Link to={`${_id}`}>
        <Button>Ver proyecto</Button>
      </Link>
    </div>
  );
};

export default PreviewProject;
