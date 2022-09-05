import React, { useEffect, useState } from "react";
import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsFillImageFill,
  BsReverseLayoutTextSidebarReverse,
  BsPerson,
} from "react-icons/bs";
import { FaInnosoft } from "react-icons/fa";
import {
  AiFillEnvironment,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";

const SidebarMain = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubMenuOpen] = useState(false);
  const Menus = [
    // { id: 1, title: "Dashboard", url: "/projects" },
    {
      id: 2,
      title: "Proyectos",
      icon: <AiOutlineFileText />,
      submenu: true,
      submenuItems: [
        { id: 1, title: "Ver proyectos", url: "/projects/" },
        { id: 1, title: "Crear Proyecto", url: "/projects/new-project" },
      ],
      url: "/projects",
    },
    {
      id: 3,
      title: "Configuración",
      // spacing: true,
      icon: <AiOutlineSetting />,
      url: "/",
    },
    // {
    //   id: 4,
    //   title: "Projects",
    //   icon: <BsReverseLayoutTextSidebarReverse />,
    //   submenu: true,
    //   submenuItems: [
    //     { id: 1, title: "Submenu 1" },
    //     { id: 2, title: "Submenu 2" },
    //     { id: 3, title: "Submenu 3" },
    //   ],
    // },
    // { id: 5, title: "Analytics", icon: <AiOutlineBarChart /> },
    // { id: 6, title: "Inbox", icon: <AiOutlineSetting /> },
    // { id: 7, title: "Profile", spacing: true, icon: <BsPerson /> },
    // { id: 8, title: "Setting", icon: <AiOutlineSetting /> },
    // { id: 9, title: "Logout", icon: <AiOutlineLogout /> },
  ];
  return (
    <div
      className={`bg-white h-auto p-5 pt-8 border-r border-x-blue-gray-900 ${
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
        {/* <FaInnosoft
          className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
            open && "rotate-[360deg]"
          }`}
        /> */}
        {/* <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Menu
        </h1> */}
        <Link to={"/projects"}>
          <img src={Logo} alt="" className="w-full" />
        </Link>
      </div>
      {/* <div
        className={`flex items-center gap-2 rounded-md bg-light-white mt-6 ${
          !open ? "px-2.5" : "px-4"
        } py-2`}
      >
        <BsSearch
          className={`text-slate-300 text-lg block float-left cursor-pointer ${
            !open && "mr-2"
          }`}
        />
        <input
          type="search"
          placeholder="Buscar"
          className={`text-base bg-transparent w-full text-black focus:outline-none placeholder-blue-gray-900 ${
            !open && "hidden"
          }`}
        />
      </div> */}

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <div key={index}>
            <li
              className={`text-slate-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              } `}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>

              {menu.submenu && open && (
                <BsChevronDown
                  className={`${submenuOpen && "rotate-180"}`}
                  onClick={() => setSubMenuOpen(!submenuOpen)}
                />
              )}
            </li>

            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <Link to={submenuItem.url} key={index}>
                    <li
                      className={`text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-slate-400 rounded-md`}
                    >
                      {submenuItem.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMain;
