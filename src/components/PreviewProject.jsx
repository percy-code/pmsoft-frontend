import React from "react";
import { Link } from "react-router-dom";

const PreviewProject = ({ project }) => {
  const { name, _id, client } = project;

  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500">
          {""} {client}
        </span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray hover:text-gra-800 text-sm font-bold"
      >
        Ver proyecto
      </Link>
    </div>
  );
};

export default PreviewProject;
