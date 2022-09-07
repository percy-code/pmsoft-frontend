import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/projects", config);
        setProjects(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  //** Function to handle alert */
  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  //** Function to Send Project and Create */
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  //** GET ONE PROJECT */
  const getOneProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data.data.existsProject);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  //** EDIT ONE PROJECT */
  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      // Synchronize state
      const projectsUpdated = projects.map((projectState) =>
        projectState._id === data.data._id ? data.data : projectState
      );
      setProjects(projectsUpdated);
      // Show alert
      setAlert({
        message: "Proyecto actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 1000);
      // Redirect
    } catch (error) {
      console.log(error);
    }
  };

  //** CREATE NEW PROJECT */
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);
      setProjects([...projects, data.data]);

      setAlert({
        message: "Proyecto creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  //** DELETE ONE PROJECT */
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      // Synchronize state
      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectsUpdated);

      // Show alert
      setAlert({
        message: data.message,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  //** HANDLE MODAL IN CREATE TASK */
  const handleModalFormTask = () => {
    setModalFormTask(!modalFormTask);
    // Reset the objet that contain the task
    setTask({});
  };

  //** FUNCTION TO CREATE A TASK */
  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Create task
      const { data } = await clientAxios.post("/tasks", task, config);

      // Add task to state when create a new project and hide modal
      const projectUpdated = { ...project };
      projectUpdated.tasks = [...project.tasks, data.data];
      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  //** EDIT A TASK */
  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      // Actualizar el DOM
      const projectUpdate = { ...project };
      projectUpdate.tasks = projectUpdate.tasks.map((taskState) =>
        taskState._id === data.data._id ? data.data : taskState
      );

      setProject(projectUpdate);

      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  //** HANDLE CREATE A NEW TASK */
  const submitTask = async (task) => {
    // Save task in database
    // Get project of task
    if (task.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  //** HANDLE TO EDIT A TASK */
  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  //** HANDLE TO DELETE ONE TASK */
  const handleModalDeleteTask = (taskParam) => {
    setTask(taskParam);
    setModalDeleteTask(!modalDeleteTask);
  };

  //** FUNCTION TO DELETE ONE TASK */
  const deleteOneTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      setAlert({
        message: data.message,
        error: false,
      });

      // Actualizar el DOM
      const projectUpdate = { ...project };

      projectUpdate.tasks = projectUpdate.tasks.filter(
        (taskState) => taskState._id !== task._id
      );
      setProject(projectUpdate);
      setModalDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  //** HANDLE TO ADD COLLABORATOR TO PROJECT */
  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        "/projects/collaborators",
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  //** FUNCTION TO ADD COLLABORATOR */
  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );

      console.info(data);
      setAlert({
        message: data.message,
        error: false,
      });

      setCollaborator({});
      setAlert({});
    } catch (error) {
      console.error("Error en Catch", error);
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  //** HANDLE MODAL TO DELETE A COLLABORATOR */
  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  //** FUNCTION TO DELETE A COLLABORATOR */
  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      // Update the project to show news collaborators
      const projectUpdated = { ...project };

      projectUpdated.collaborators = projectUpdated.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator.id
      );

      setProject(projectUpdated);

      setAlert({
        message: data.message,
        error: false,
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getOneProject,
        project,
        loading,
        deleteProject,
        modalFormTask,
        handleModalFormTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteOneTask,
        collaborator,
        submitCollaborator,
        addCollaborator,
        modalDeleteCollaborator,
        handleModalDeleteCollaborator,
        deleteCollaborator,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
