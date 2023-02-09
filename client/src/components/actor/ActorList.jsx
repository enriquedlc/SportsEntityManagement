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

import ActorService from "./services/actor.service";
import "../../../src/App.css";

/**
 * An array containing the columns of the table
 * @type {Array<{id:string, label:string}>}
 */
const columns = [
  { id: "actor_id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "last_name", label: "Last Name" },
  { id: "options", label: "Opciones" },
];

/**
 * A functional component that displays a table with a list of actors
 *
 * *
 * @returns {JSX.Element} - Returns a JSX element that represents
 * the table of actors
 *
 */
const ActorList = () => {
  /**
   * The state containing the list of actors
   * @type {Array<{actor_id:number, first_name:string, last_name:string}>}
   */
  const [actors, setActors] = useState([]);
  /**
   * The state indicating if the component is currently loading data
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * The state containing the current page of the table
   * @type {number}
   */
  const [page, setPage] = useState(0);
  /**
   * The state containing the number of rows per page of the table
   * @type {number}
   */
  const [rowsPerPage, setRowsPerPage] = useState(10);
  /**
   * The state containing the total number of rows in the table
   * @type {number}
   */
  const [totalRows, setTotalRows] = useState(actors.length);

  /**
   * An effect hook that retrieves the list of actors from the service and updates the actors state
   */
  useEffect(() => {
    async function retrieveActors() {
      try {
        const data = await ActorService.getAllActors();
        setActors(data);
        setTotalRows(data.length);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      retrieveActors();
    }, 1500);
  }, []);

  async function deleteActor(id) {
    try {
      await ActorService.deleteActor(id);
      setActors(actors.filter((actor) => actor.actor_id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "¿Está seguro que desea realizar esta acción?",
      message: "Borrar actor con id: " + id,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteActor(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  /**  table change page handlers
   *
   * @function
   * @param {object} event - event object
   * @param {number} newPage - new page number
   * @returns {void}
   *
   * handleChangePage is a callback function that is invoked when
   * the page number of the table changes.
   */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   *
   * @function
   * @param {object} event - event object
   * @returns {void}
   *
   * handleChangeRowsPerPage is a callback function that is
   * invoked when the number of rows per page in the table changes.
   *
   */

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="subtitle">
        <h3 className="h3-actor-list">Listado de actores</h3>
      </div>
      <div className="loader-container">
        {loading && <InfinitySpin width="200" color="purple" />}
      </div>
      <section>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#AC4FC6" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {actors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((actor, index) => (
                  <TableRow
                    key={actor.actor_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "darkgray" : "gray",
                    }}
                  >
                    <TableCell>{actor.actor_id}</TableCell>
                    <TableCell>{actor.first_name}</TableCell>
                    <TableCell>{actor.last_name}</TableCell>
                    <TableCell>
                      <Link
                        className="link-button"
                        to={`edit/${actor.actor_id}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="magic-button"
                        onClick={() => confirmDelete(actor.actor_id)}
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

export default ActorList;
