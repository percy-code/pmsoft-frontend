import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-transparent.png";
import { Input } from "@material-tailwind/react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Search from "./Search";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { handleSearch, logoutSessionProjects } = useProjects();
  const { logout } = useAuth();

  const handleLogout = () => {
    logoutSessionProjects();
    logout();
    localStorage.removeItem("token");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 hover:rounded-lg"
      >
        <Link
          to="/projects"
          className="flex items-center"
          onClick={() => setOpenNav(!openNav)}
        >
          Proyectos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 hover:rounded-lg"
      >
        <Link
          to="/projects/new-project"
          className="flex items-center"
          onClick={() => setOpenNav(!openNav)}
        >
          Crear proyecto
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer hover:bg-gray-300 hover:rounded-lg"
      >
        <span className="flex items-center" onClick={handleLogout}>
          Cerrar sesión
        </span>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 lg:hidden">
      <div className="container mx-auto flex items-center justify-end text-blue-gray-900">
        {/* <div className="hidden lg:block">{navList}</div> */}
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={handleSearch}
        >
          <span>Buscar Proyecto</span>
        </Button>
        <Link to="/projects" className="lg:hidden">
          <img src={Logo} alt="Logotipo" className="w-4/12" />
        </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Buscar</span>
        </Button> */}
      </MobileNav>
      <Search />
    </Navbar>
  );
};

export default Header;
