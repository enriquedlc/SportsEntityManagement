/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ActorService from "./services/actor.service";

/**
 * ActorForm is a component that displays a form for creating
 * or editing an actor. It uses the useEffect hook to check if
 * the component is being rendered with an id prop in the URL
 * params, and if so, it calls the searchActor function which
 * retrieves the actor data from the server by calling the
 * ActorService.getActorById method.
 *
 * ActorForm component is a functional component that takes in the following props:
 * @param {Object} currentActor - current state of the actor
 * @param {function} setCurrentActor - function to update the state of the actor
 * @param {function} handleChange - function to handle the change event of the form inputs
 * @param {function} handleSubmit - function to handle the submit event of the form
 */

const ActorForm = ({
  currentActor,
  setCurrentActor,
  handleChange,
  handleSubmit,
}) => {
  /*
   * useParams hook is used to extract the "id" from the URL
   */

  const { id } = useParams();

  /*
   * useEffect hook is used to fetch the actor data when the component loads
   * and when the "id" changes
   */

  useEffect(() => {
    if (id) {
      searchActor(id);
    }
  }, [id]);

  /*
   * formTitle function is used to set the title of the form
   * if there is an "id" in the URL, the form is in "edit" mode
   */

  const formTitle = () => {
    return id ? "Editar Actor" : "Nuevo Actor";
  };

  /**
   * searchActor function is used to fetch the actor data from the API
   * and update the state of the actor
   * @param {number} id - id of the actor
   * @returns {Object} - actor data
   */

  const searchActor = async (id) => {
    try {
      const response = await ActorService.getActorById(id);
      console.log("holaaaa", response);
      setCurrentActor(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>{formTitle()}</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="mx-3">
            <label htmlFor="fname" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="fname"
              name="first_name"
              onChange={handleChange}
              placeholder="Nombre del actor"
              value={currentActor.first_name}
            />
          </div>
        </form>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mx-3">
            <label htmlFor="lname" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              name="last_name"
              onChange={handleChange}
              placeholder="Apellidos del actor"
              value={currentActor.last_name}
            />
          </div>
          <div className="mb-3 mx-3 centered">
            <button className="btn btn-primary mr-3">
              Grabar
              <ToastContainer
                toastStyle={{ backgroundColor: "#1a1a1a", color: "#fff" }}
              />
            </button>
            <Link to="/actors" className="btn btn-danger mr-3">
              Cancelar{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActorForm;
