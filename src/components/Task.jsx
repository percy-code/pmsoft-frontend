import React from "react";
import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";
import { Button } from "@material-tailwind/react";
import useAdmin from "../hooks/useAdmin";

const Task = ({ task }) => {
  const { description, name, priority, dateDelivery, _id, status } = task;
  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProjects();
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex flex-col justify-between bg-white my-6 rounded-xl lg:flex-row">
      <div>
        <p className="text-ls mb-2">{name}</p>
        <p className="text-sm mb-2 text-gray-500 uppercase">{description}</p>
        <p className="text-ls mb-2">Prioridad: {priority}</p>
        <p className="text-ls mb-2">
          Fecha de Entrega: {formatDate(dateDelivery)}
        </p>
        {status && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white lg:w-1/2">
            Completado por: {task.completed.name}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-4 gap-1 sm:flex-row lg:mt-0">
        {admin && (
          <Button
            color="blue"
            onClick={() => handleModalEditTask(task)}
            className="w-full"
          >
            Editar
          </Button>
        )}

        <Button
          color={`${status ? "green" : "gray"}`}
          onClick={() => completeTask(_id)}
          className="w-full"
        >
          {status ? "Completa" : "Incompleta"}
        </Button>

        {admin && (
          <Button
            color="red"
            onClick={() => handleModalDeleteTask(task)}
            className="w-full"
          >
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
};

export default Task;
