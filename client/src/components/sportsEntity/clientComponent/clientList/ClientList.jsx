import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { InfinitySpin } from "react-loader-spinner";

import "./ClientList.css";

import ClientService from "../../services/client.service/client.service";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "firstName", headerName: "First name" },
  { field: "lastName", headerName: "Last name" },
  { field: "dni", headerName: "DNI" },
  { field: "email", headerName: "Email" },
  { field: "subscription_date", headerName: "Subscription Date" },
  { field: "options", headerName: "Options" },
];

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(clients.length);

  useEffect(() => {
    async function retrieveClients() {
      try {
        const data = await ClientService.getAllClients();
        setClients(data);
        setTotalRows(data.length);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      retrieveClients();
    }, 1000);
  }, []);

  async function deleteClient(id) {
    try {
      await ClientService.deleteClient(id);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the client with id: " + id,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteClient(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="subtitle">
        <h3 className="h3-client-list">Listado de clientes</h3>
      </div>
      <div className="loader-container">
        {loading && <InfinitySpin width="200" color="purple" />}
      </div>
      <div className="new-client-button-container">
        <Link className="link-button" to="/clients/new">
          Nuevo cliente
        </Link>
      </div>
      <section>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#AC4FC6" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client, index) => (
                  <TableRow
                    key={client.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "darkgray" : "gray",
                    }}
                  >
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.first_name}</TableCell>
                    <TableCell>{client.last_name}</TableCell>
                    <TableCell>{client.dni}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.subscription_date}</TableCell>
                    <TableCell>
                      <Link className="link-button" to={`edit/${client.id}`}>
                        Editar
                      </Link>
                      <button
                        className="magic-button"
                        onClick={() => confirmDelete(client.id)}
                      >
                        Eliminar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ backgroundColor: "#AC4FC6" }}
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </section>
    </>
  );
};

export default ClientList;
