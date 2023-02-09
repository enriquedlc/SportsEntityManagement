import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand className="navbar" href="#home">
        Sports Entity Management Application
      </Navbar.Brand>
      <Nav className="navbar-button">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/clients">
          Clients
        </Nav.Link>
        <Nav.Link as={Link} to="/trainers">
          Trainers
        </Nav.Link>
        <Nav.Link as={Link} to="/gymmachines">
          Machines
        </Nav.Link>
        <Nav.Link as={Link} to="/payments">
          Payments
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
