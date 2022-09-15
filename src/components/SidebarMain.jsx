import React, { useEffect, useState } from "react";
import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsFillImageFill,
  BsReverseLayoutTextSidebarReverse,
  BsPerson,
} from "react-icons/bs";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiDashboardFill, RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

const SidebarMain = () => {
  const [open, setOpen] = useState(true);

  const { auth, logout } = useAuth();
  const { logoutSessionProjects } = useProjects();

  const handleLogout = () => {
    logoutSessionProjects();
    logout();
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`hidden lg:block bg-white h-auto p-5 pt-8 border-r border-x-blue-gray-900 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <div onClick={() => setOpen(!open)}>
        <BsArrowLeftShort
          className={`bg-[#0086BF] text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
        />
      </div>

      <div className="inline-flex my-8">
        <Link to={"/projects"}>
          <img src={Logo} alt="" className="w-full" />
        </Link>
      </div>

      <div
        className={`flex flex-col justify-center items-center gap-4 border-b pb-2 ${
          !open && "hidden"
        }`}
      >
        <FaUserAlt size={50} />
        <p>{auth.name}</p>
      </div>

      <ul className="pt-2">
        <li>
          <Link
            to={"/projects"}
            className={`text-slate-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}
          >
            <span className="text-2xl block float-left">
              <RiDashboardFill />
            </span>
            <span
              className={`text-base font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Proyectos
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/projects/new-project"}
            className={`text-slate-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}
          >
            <span className="text-2xl block float-left">
              <MdOutlineCreateNewFolder />
            </span>
            <span
              className={`text-base font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Crear proyecto
            </span>
          </Link>
        </li>
        <li
          className={`text-slate-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}
          onClick={handleLogout}
        >
          <span className="text-2xl block float-left">
            <RiLogoutBoxFill />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Cerrar sesión
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMain;
