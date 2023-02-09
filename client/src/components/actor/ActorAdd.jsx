import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ActorService from "./services/actor.service";
import ActorForm from "./ActorForm";

/**
 * initialActorState is an object that contains the initial values
 * for the actor's first and last names.
 */

const initialActorState = {
  first_name: "",
  last_name: "",
};

/**
 * ActorAdd is a functional component that allows adding a new actor
 * by using the ActorForm component and passing it some props.
 * When the form is submitted, it calls the ActorService.createActor
 * method to create the new actor on the server and shows a notification
 * using the toast.success method.
 */

const ActorAdd = () => {
  /**
   * notifyError is a function that shows an error notification
   * with the message "Todos los campos son necesarios"
   *
   * notifySuccess is a function that shows a success notification
   * with the message "Actor añadido..."
   *
   * currentActor is a state variable that contains the actor being added.
   */

  const notifyError = () => toast.error("Todos los campos son necesarios");
  const notifySuccess = () => toast.success("Actor añadido...");
  const [currentActor, setCurrentActor] = useState(initialActorState);

  /**
   * navigate is a hook that allows to navigate between routes
   */

  const navigate = useNavigate();

  /**
   * handleChange is a function that updates the currentActor state
   * when the form inputs are changed
   * @param {Event} e - the input event
   */

  const handleChange = (e) => {
    setCurrentActor({
      ...currentActor,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * handleSubmit is a function that sends the form data to the server
   * using the ActorService.createActor method, and shows a notification
   * using the toast.success method. After that, it redirects to the /actors route
   * @param {Event} e - the submit event
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentActor.first_name.trim() === "" ||
      currentActor.last_name.trim() === ""
    ) {
      notifyError();
      return;
    }

    const insertActor = async () => {
      try {
        await ActorService.createActor(currentActor);
        notifySuccess();

        setTimeout(() => {
          navigate("/actors");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };
    insertActor();
  };

  return (
    <ActorForm
      currentActor={currentActor}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ActorAdd;
