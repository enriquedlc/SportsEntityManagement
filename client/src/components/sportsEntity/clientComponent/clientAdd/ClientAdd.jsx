import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientService from "../../services/client.service/client.service";
import ClientForm from "../clientForm/ClientForm";

const initialClientState = {
  first_name: "",
  last_name: "",
  dni: "",
  gender: "",
  phone: "",
  email: "",
};

const ClientAdd = () => {
  const notifyError = () => toast.error("Todos los campos son necesarios");
  const notifySuccess = () => toast.success("Cliente añadido...");
  const [currentClient, setCurrentClient] = useState(initialClientState);

  const navigate = useNavigate();

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
        await ClientService.createClient(currentClient);
        console.log(currentClient);
        notifySuccess();
        setTimeout(() => {
          navigate("/clients");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };
    insertClient();
  };

  return (
    <ClientForm
      currentClient={currentClient}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ClientAdd;
