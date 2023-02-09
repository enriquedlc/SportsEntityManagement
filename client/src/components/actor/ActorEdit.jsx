import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ActorService from "./services/actor.service";
import ActorForm from "./ActorForm";

/**
 * initialActorState is an object that contains the initial values
 * for the actor's first and last names and id.
 */

const initialActorState = {
  actor_id: null,
  first_name: "",
  last_name: "",
};

/**
 * ActorEdit is a functional component that allows editing an
 * actor by using the ActorForm component and passing it some props.
 * When the form is submitted, it calls the ActorService.updateActor
 * method to update the actor on the server and shows a notification
 * using the toast.info method.
 *
 * @property {number} actor_id - The id of the actor.
 * @property {string} first_name - The first name of the actor.
 * @property {string} last_name - The last name of the actor.
 *
 * @function
 * @returns {JSX.Element} A form for editing an actor.
 * @param {function} props.setCurrentActor - A function to update the state of the actor being edited.
 * @param {function} props.handleChange - A function to handle changes to the form inputs.
 * @param {function} props.handleSubmit - A function to handle the form submission.
 * @param {object} props.currentActor - The actor being edited.
 *
 */

const ActorEdit = () => {
  /**
   * the notifyError function shows a toast notification
   * when the form is submitted with empty fields it shows
   * a toast notification using the toast.error method.
   *
   * the notifyUpdate function shows a toast notification
   * when the form is submitted with valid data it shows
   * a toast notification using the toast.info method.
   */

  const notifyError = () => toast.error("Todos los campos son necesarios");
  const notifyUpdate = () => toast.info("Actor modificado");
  const [currentActor, setCurrentActor] = useState(initialActorState);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e) => {
    setCurrentActor({
      ...currentActor,
      [e.target.name]: e.target.value,
    });
  };

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
        await ActorService.updateActor(id, currentActor);
        notifyUpdate();
        setTimeout(() => {
          navigate("/actors");
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };
    insertActor();
  };

  return (
    <ActorForm
      currentActor={currentActor}
      setCurrentActor={setCurrentActor}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ActorEdit;
