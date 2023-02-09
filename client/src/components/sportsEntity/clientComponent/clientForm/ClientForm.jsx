/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientService from "../../services/client.service/client.service";
import "./ClientForm.css";

const ClientForm = ({
  currentClient,
  setCurrentClient,
  handleChange,
  handleSubmit,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      searchClient(id);
      console.log(currentClient);
    }
  }, [id]);

  const formTitle = () => {
    return id ? "Editar Cliente" : "Nuevo Cliente";
  };

  const searchClient = async (id) => {
    try {
      const response = await ClientService.getClientById(id);
      console.log('TUPADRE', response)
      setCurrentClient(response);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * test
   */

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
              placeholder="Nombre del cliente"
              defaultValue={id ? currentClient.first_name : ""}
            />
          </div>
        </form>
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
              placeholder="Apellidos del cliente"
              defaultValue={id ? currentClient.last_name : ""}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="mx-3">
            <label htmlFor="cdni" className="form-label">
              DNI
            </label>
            <input
              type="text"
              className="form-control"
              id="cdni"
              name="dni"
              onChange={handleChange}
              placeholder="DNI del cliente"
              defaultValue={id ? currentClient.dni : ""}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="mx-3">
            <label htmlFor="cgender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="cgender"
              name="gender"
              onChange={handleChange}
              placeholder="Género"
              defaultValue={id ? currentClient.gender : ""}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="mx-3">
            <label htmlFor="cphone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="cphone"
              name="phone"
              onChange={handleChange}
              placeholder="Número de teléfono"
              defaultValue={id ? currentClient.phone : ""}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="mx-3">
            <label htmlFor="cemail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="cemail"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              defaultValue={id ? currentClient.email : ""}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mx-3 centered">
            <button className="btn btn-primary mr-3">
              Grabar
              <ToastContainer
                toastStyle={{ backgroundColor: "#1a1a1a", color: "#fff" }}
              />
            </button>
            <Link to="/clients" className="btn btn-danger mr-3">
              Cancelar{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
