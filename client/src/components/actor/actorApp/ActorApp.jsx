import { Routes, Route } from "react-router-dom";

// ClientApp
import ClientList from "../../sportsEntity/clientComponent/clientList/ClientList";
import ClientForm from "../../sportsEntity/clientComponent/clientForm/ClientForm";

// ActorApp
// import ActorAdd from "../ActorAdd";
// import ActorEdit from "../ActorEdit";
// import ActorList from "../ActorList";

import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";
import Home from "../pages/Home";
import ClientEdit from "../../sportsEntity/clientComponent/clientEdit/ClientEdit";

const ActorApp = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} />
        <Route path="/clients/edit/:id" element={<ClientEdit />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default ActorApp;
