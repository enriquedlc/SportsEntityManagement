import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientService from "../../services/client.service/client.service";
import ClientForm from "../clientForm/ClientForm";

const initialClientState = {
  id: null,
  first_name: "",
  last_name: "",
  dni: "",
  gender: "",
  phone: "",
  email: "",
};

const ClientEdit = () => {
  const notifyError = () => toast.error("Todos los campos son necesarios");
  const notifyUpdate = () => toast.info("Cliente modificado");
  const [currentClient, setCurrentClient] = useState(initialClientState);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e) => {
    setCurrentClient({
      ...currentClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentClient.first_name.trim() === "" ||
      currentClient.last_name.trim() === "" ||
      currentClient.dni.trim() === "" ||
      currentClient.gender.trim() === "" ||
      currentClient.phone.trim() === "" ||
      currentClient.email.trim() === ""
    ) {
      notifyError();
      return;
    }

    const insertClient = async () => {
      try {
        await ClientService.updateClient(id, currentClient);
        notifyUpdate();
        setTimeout(() => {
          navigate("/clients");
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };
    insertClient();
  };

  return (
    <ClientForm
      currentClient={currentClient}
      setCurrentClient={setCurrentClient}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ClientEdit;
