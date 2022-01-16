import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

import gradeStyle from "./[pid].module.css";
import Cookie from "js-cookie";

import axios from "axios";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

function createData(name, code, population, size) {
  const density = population;
  return { name, code, population, size, density };
}

const data = [
  {
    name: "duong boi long",
    "giua ky": 100,
    "cuoi ky": 25,
    seminar: 100,
    "bai tap": 100,
  },
  {
    name: "Pham Tong Binh Minh",
    "giua ky": 100,
    "cuoi ky": 100,
    seminar: 100,
    "bai tap": 100,
  },
  {
    name: "Vo The Minh",
    "giua ky": 90,
    "cuoi ky": 90,
    seminar: 90,
    "bai tap": 100,
  },
  {
    name: "Boi Long",
    "giua ky": 75,
    "cuoi ky": 85,
    seminar: 85,
    "bai tap": 100,
  },
  {
    name: "Binh Minh",
    "giua ky": 100,
    "cuoi ky": 85,
    seminar: 90,
    "bai tap": 100,
  },
];

export default function StickyHeadTable() {
  const router = useRouter();
  const { pid } = router.query;

  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
    axiosApiCall(
      `classroom-grade/download-student-list-template/61e3ce15876a79e98d85769e`,
      "get",
      headers,
      []
    )
      .then((res) => {
        console.log("classroom-grade/download-student-list-template");
        console.log(res.data.resValue);
      })
      .catch(function (error) {
        console.log("lỗi rồi nè má");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);

  useEffect(() => {
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/detail/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }

    axiosApiCall(
      `classroom-grade/classroom-grade-detail/${pid}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        console.log(res.data.resValue);
      })
      .catch(function (error) {
        console.log("lỗi rồi nè má");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    let Col = Object.keys(data[0]);
    //Col.push("Tong ket");
    setColumn(Col);
    setRow(data);
  }, [pid]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, pos) => {
    console.log(event.currentTarget.value);
    console.log(pos);

    const position = pos.search("_");
    const row = pos.substring(0, position);
    const col = pos.substring(position + 1);
    console.log(row);
    console.log(col);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <form>
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
                  <TableHead className={gradeStyle.tableHead}>
                    <TableRow>
                      {columns.map((column, posCol) =>
                        posCol == 0 ? (
                          <TableCell
                            key={posCol}
                            className={gradeStyle.headerName}
                          >
                            <span className={gradeStyle.headerLabel}>
                              {column}
                            </span>
                          </TableCell>
                        ) : (
                          <TableCell key={posCol} className={gradeStyle.header}>
                            <span className={gradeStyle.headerLabel}>
                              {column}
                            </span>
                            <span className={gradeStyle.moreOption}>
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
                                <MenuItem onClick={handleClose}>
                                  Công bố điểm
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Export file
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Import file
                                </MenuItem>
                              </Menu>
                            </span>
                          </TableCell>
                        )
                      )}
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
                            key={posRow}
                            style={{ height: "auto !important" }}
                          >
                            {columns.map((column, posCol) => {
                              const value = row[column];
                              const pos = posRow + "_" + posCol;

                              return posCol == 0 ? (
                                <TableCell
                                  key={pos}
                                  className={gradeStyle.name}
                                  sx={{ m: 1, width: "150px" }}
                                >
                                  {value}
                                </TableCell>
                              ) : (
                                <TableCell
                                  key={pos}
                                  className={gradeStyle.grade}
                                >
                                  <OutlinedInput
                                    type="number"
                                    sx={{ m: 1, width: "130px" }}
                                    id="outlined-adornment-weight"
                                    defaultValue={value}
                                    {...register(`${pos}`)}
                                    //onChange={onChange}
                                    onChange={(e) => handleChange(e, pos)}
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
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit(onSubmit)}
          className={gradeStyle.button}
        >
          Lưu điểm
        </Button>
        <Button variant="contained" color="error" className={gradeStyle.button}>
          Export File
        </Button>
        <Button variant="contained" className={gradeStyle.button}>
          Import File
        </Button>
      </form>
    </Paper>
  );
}
