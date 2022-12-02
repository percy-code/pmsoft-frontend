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
    <div className="border-b p-5 flex flex-col justify-between bg-white my-6 rounded-xl lg:flex-row shadow-xl">
      <div>
        <div>
          <span className="text-xs text-gray-700 uppercase">Tarea</span>
          <p className="mb-2 text-sm">{name}</p>
        </div>
        <div>
          <span className="text-xs text-gray-700 uppercase">Descripción</span>
          <p className="mb-2 text-sm">{description}</p>
        </div>
        <div>
          <span className="text-xs text-gray-700 uppercase">Prioridad</span>
          <p className="mb-2 text-sm">{priority}</p>
        </div>
        <div>
          <span className="text-xs text-gray-700 uppercase">
            Fecha de entrega
          </span>
          <p className="mb-2 text-sm">{formatDate(dateDelivery)}</p>
        </div>
        {status && (
          <p className="text-[10px] bg-green-600 uppercase p-1 rounded-lg text-white lg:w-1/2 w-max">
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
            size="sm"
          >
            Editar
          </Button>
        )}

        <Button
          color={`${status ? "green" : "gray"}`}
          onClick={() => completeTask(_id)}
          className="w-full"
          size="sm"
        >
          {status ? "Incompleta" : "Completar"}
        </Button>

        {admin && (
          <Button
            color="red"
            onClick={() => handleModalDeleteTask(task)}
            className="w-full"
            size="sm"
          >
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
};

export default Task;
