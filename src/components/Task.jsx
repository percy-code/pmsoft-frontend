import React from "react";
import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";
import { Button } from "@material-tailwind/react";

const Task = ({ task }) => {
  const { description, name, priority, dateDelivery, _id, status } = task;
  const { handleModalEditTask, handleModalDeleteTask } = useProjects();
  return (
    <div className="border-b p-5 flex justify-between bg-white m-6 rounded-xl">
      <div>
        <p className="text-ls mb-2">{name}</p>
        <p className="text-sm mb-2 text-gray-500 uppercase">{description}</p>
        <p className="text-ls mb-2">Prioridad: {priority}</p>
        <p className="text-ls mb-2">
          Fecha de Entrega: {formatDate(dateDelivery)}
        </p>
      </div>
      <div className="flex justify-center items-center gap-1">
        {/* <button
          className="bg-blue-gray-500"
          onClick={() => handleModalEditTask(task)}
        >
          Editar
        </button> */}
        <Button color="blue" onClick={() => handleModalEditTask(task)}>
          Editar
        </Button>
        {status ? (
          <Button color="green">Completar</Button>
        ) : (
          <Button color="amber">Incompleta</Button>
        )}

        <Button color="red" onClick={() => handleModalDeleteTask(task)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Task;
