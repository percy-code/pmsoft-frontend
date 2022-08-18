import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <Typography variant="h4">Bienvenido: {auth.name} </Typography>
      <div className="w-full flex justify-start my-2">
        <Button>
          <Link to="new-project" className="">
            Nuevo Proyecto
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
