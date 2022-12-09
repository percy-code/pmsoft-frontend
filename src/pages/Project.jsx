import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SpinnerLoading from "../components/SpinnerLoading";
import useProjects from "../hooks/useProjects";
import ModalFormTasks from "../components/ModalFormTasks";
import ModalDeleteTask from "../components/ModalDeleteTask";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import Task from "../components/Task";
import Collaborator from "../components/Collaborator";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Button } from "@material-tailwind/react";

let socket;

const Project = () => {
  const params = useParams();
  const { id } = params;
  const {
    getOneProject,
    project,
    loading,
    handleModalFormTask,
    alert,
    submitTaskProject,
    deleteTaskOfProject,
    updateTaskInProject,
    changeStateOfTask,
  } = useProjects();
  const { name } = project;
  const navigate = useNavigate();
  const admin = useAdmin();

  useEffect(() => {
    getOneProject(id);
  }, []);

  useEffect(() => {
    // Connect to server SocketIO
    socket = io(import.meta.env.VITE_BACKEND_URL);

    // Create an event
    socket.emit("open project", params.id);
  }, []);

  // This useEffect executing all the time
  // useEffect(() => {
  //   socket.on("response", (persoun) => {
  //     console.log(persoun);
  //   });
  // });

  useEffect(() => {
    socket.on("task add", (taskNew) => {
      if (taskNew.project === project._id) {
        submitTaskProject(taskNew);
      }
    });

    socket.on("task deleted", (taskDeleted) => {
      if (taskDeleted.project === project._id) {
        // Update the state
        deleteTaskOfProject(taskDeleted);
      }
    });

    socket.on("task updated", (taskUpdated) => {
      if (taskUpdated.project._id === project._id) {
        updateTaskInProject(taskUpdated);
      }
    });

    socket.on("new state", (newStateOfTask) => {
      if (newStateOfTask.project._id === project._id) {
        changeStateOfTask(newStateOfTask);
      }
    });
  });

  if (loading)
    return (
      <div className="flex flex-1 justify-center h-screen mt-4">
        <SpinnerLoading />
      </div>
    );

  const { message } = alert;

  return (
    <div className="md:mx-10">
      <div className="bg-white shadow my-10 rounded-lg p-4 flex sm:flex-row justify-between">
        <div className="">
          <p className="text-xs">Proyecto:</p>
          <h1 className="font-black text-2xl">{name}</h1>
          {/* Button edit */}
          {admin && (
            <div className="flex justify-between items-center mt-2 gap-2 text-gray-400 hover:text-black">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                <Link to={`/projects/edit/${id}`}>Editar</Link>
              </div>
            </div>
          )}
        </div>
        <TiArrowBack
          size={30}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      {/* Button add task */}
      {admin && (
        <div className="2xl:w-3/12">
          <Button
            size="sm"
            fullWidth
            className="flex items-center justify-center gap-1"
            onClick={handleModalFormTask}
            ripple={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Agregar tarea
          </Button>
        </div>
      )}

      <div className="mt-6">
        <p className="text-xl mt-4 font-medium">Tareas del Proyecto</p>
        <div>
          {project.tasks?.length ? (
            project.tasks?.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <p className="text-xs text-gray-500">
              Aún no has agregado tareas en este proyecto
            </p>
          )}
        </div>
        {admin && (
          <div className="mb-10">
            <div className="flex items-center justify-between mt-10">
              <p className="text-xl lg:mt-4 text-center">Colaboradores</p>
              <Link
                to={`/projects/new-colaborator/${project._id}`}
                className="flex gap-1"
              >
                <AiOutlineUserAdd size={25} />
              </Link>
            </div>
            <div>
              {project.collaborators?.length ? (
                project.collaborators?.map((collaborator) => (
                  <Collaborator
                    key={collaborator._id}
                    collaborator={collaborator}
                  />
                ))
              ) : (
                <p className="text-xs text-gray-500">
                  Aún no has agregado colaboradores a este proyecto
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <ModalFormTasks />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </div>
  );
};

export default Project;
