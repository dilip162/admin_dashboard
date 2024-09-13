import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  const [data, setData] = useState([]);

  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        api.delete(`/page/deletepage/${id}`).then((data) => {
          console.log(data.data.success);
          if (data.data.success) {
            api.get("/page/pages").then((response) => {
              setData(response.data.data);
              console.log(response.data);
            });
          }
        });
      }
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
    <>
      <Table style={{ borderRadius: "6px" }}>
        <TableHead>
          <TableRow style={{ background: "#D0D0D0" }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Id
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Name
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Title
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Short Description
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Description
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Category
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Cat
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Image URL
            </TableCell>
            <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>
              Actions
            </TableCell>
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
                  <TableCell>{truncateString(row.category, 40)}</TableCell>
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
                        <DeleteIcon onClick={handleDelete} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomTable;
