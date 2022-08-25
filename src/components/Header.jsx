import React from "react";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        {/* Add logotype */}
        <Link to={"/projects"}>
          <img src={Logo} alt="" className="w-3/12" />
        </Link>
        <input
          type="search"
          placeholder="Buscar proyecto"
          className="rounded-lg lg:w-96 p-2 border"
        />

        {/* <Input label="Username" /> */}
        <div className="flex items-center gap-3">
          <Link to="/projects" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white bg-cyan-600 text-xs p-3 rounded-md uppercase font-bold"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
