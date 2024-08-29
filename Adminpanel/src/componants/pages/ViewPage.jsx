import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TablePagination,
} from "@mui/material";

import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import api from "../../utils/intercepter";

// ----------- Component -----------------

const CustomTable = () => {
  // ---------- State define -----------
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/page/pages");

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // ------------ View Page ----------

  const handleView = (id) => {
    navigate(`${id}`); // Create view page with the specific ID
  };

  // ------------ Edit Page / Update page ----------

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    navigate(`/admin/pages/update/${id}`);
  };

  // ------------ Delete Page ----------

  const handleDelete = async (id) => {
    try {
      console.log(`Delete item with id: ${id}`);

      await api.delete(`/page/deletepage/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- truncate the strings --------------

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ width: "100%", marginTop: "100px", marginLeft: "100px" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "black", color: "white" }}>
              <TableCell padding="checkbox" style={{ color: "white" }}>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                  style={{ color: "white" }}
                />
              </TableCell>
              <TableCell style={{ color: "white" }}>Id</TableCell>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Title</TableCell>
              <TableCell style={{ color: "white" }}>
                Short Description
              </TableCell>
              <TableCell style={{ color: "white" }}>Description</TableCell>
              <TableCell style={{ color: "white" }}>Category</TableCell>
              <TableCell style={{ color: "white" }}>Cat</TableCell>
              <TableCell style={{ color: "white" }}>Image URL</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      {truncateString(row.short_description, 40)}
                    </TableCell>
                    <TableCell>{truncateString(row.description, 40)}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.cat}</TableCell>
                    <TableCell>{row.image_URL}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleView(row.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
