import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, owner } = project;
  return (
    <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-2 justify-between items-center">
      <div className="w-full">
        <p className="text-md xl:text-base 2xl:text-xl">{name}</p>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-500 uppercase xl:text-sm">
            CLIENTE: {client}
          </span>
          {auth._id !== owner && (
            <span className="text-[10px] p-1 rounded-lg bg-green-500 text-white text-center 2xl:text-base">
              Colaborador
            </span>
          )}
        </div>
      </div>

      <Link to={`${_id}`} className="w-full 2xl:mt-6">
        <Button size="sm" className="w-full 2xl:text-base">
          Ver proyecto
        </Button>
      </Link>
    </div>
  );
};

export default PreviewProject;
