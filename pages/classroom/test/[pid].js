import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// import gradeStyle from "./[pid].module.css";

const columns = [
  { id: "nameádfsdfsdfsfsfsdfsdfsfsdfsdfsdfsdf", label: "Name" },
  { id: "coádfsdfsdfsdfsdfsfdadsfafsdasde", label: "ISO\u00a0Code" },
  {
    id: "population",
    label: "Population",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 124, 263),
  createData("China", "CN", 14, 961),
  createData("Italy", "IT", 60, 300),
];

export default function StickyHeadTable() {
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* <form>
        <Controller
          name={"textValue"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  style={{ borderCollapse: "collapse" }}
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          className={gradeStyle.header}
                        >
                          {column.label}
                          style={{ height: "auto !important" }}
                          <span>
                            <Button
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                            >
                              <ArrowDropDownIcon />
                            </Button>
                            <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Profile</MenuItem>
                              <MenuItem onClick={handleClose}>
                                My account
                              </MenuItem>
                            </Menu>
                          </span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, posRow) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                            style={{ height: "auto !important" }}
                          >
                            {columns.map((column, posCol) => {
                              const value = row[column.id];
                              const pos = posRow + "_" + posCol;
                              return (
                                <TableCell
                                  key={column.id}
                                  className={gradeStyle.grade}
                                >
                                  <OutlinedInput
                                    sx={{ m: 1, width: "120px" }}
                                    id="outlined-adornment-weight"
                                    defaultValue={
                                      column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value
                                    }
                                    {...register(`${pos}`)}
                                    onChange={onChange}
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        className={gradeStyle.gradeMaxText}
                                      >
                                        /100
                                      </InputAdornment>
                                    }
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                      "aria-label": "weight",
                                    }}
                                  />
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        />
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form> */}
    </Paper>
  );
}
