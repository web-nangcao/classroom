import React, { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid";

import FileData from "../../../components/classroom/Grade/fileData";
import MenuList from "../../../components/classroom/Grade/menu";

import TopBarClassDetail from "../../../components/topBarClassDetail/topBarClassDetail";

import Link from "next/link";
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

export default function StickyHeadTable() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [files, setfiles] = useState([]);

  const router = useRouter();
  const { pid } = router.query;
  const [listGrade, setListGrade] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);

  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };
  const studentInfor = ["Họ và Tên: ", "MSSV: "];
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log("current grade", listGrade);
    const tempListGrade = listGrade;
    let index = 0;
    for (const [key, value] of Object.entries(data)) {
      if (index === 0) {
        index++;
      } else {
        const _pos = key.search("_");
        const row = key.slice(0, _pos);
        const col = key.slice(_pos + 1);
        tempListGrade[row][columns[col].key] = value;
        index++;
      }
    }
    console.log("newGrade", tempListGrade);
    const req = { classroomId: pid, grades: tempListGrade };
    axiosApiCall(
      `classroom-grade/upload-student-grade-board-ui`,
      "post",
      headers,
      req
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
        updateData(res);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [pid]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, pos) => {
    const position = pos.search("_");
    const row = pos.substring(0, position);
    const col = pos.substring(position + 1);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportFile_SpecGrade = (assignmentID) => {
    setAnchorEl(null);
    axiosApiCall(
      `classroom-grade/download-student-spec-grade/${pid}/${assignmentID}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        window.open(res.data.resValue.url);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const mark_assignment_finallized = (assignmentID, is_finallized_var) => {
    const data = {
      classroomId: pid,
      assignmentId: assignmentID,
      is_finallized: !is_finallized_var,
    };
    axiosApiCall(
      `classroom-grade/mark-assignment-finallized`,
      "post",
      headers,
      data
    )
      .then((res) => {})
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const downloadTemplate = () => {
    axiosApiCall(
      `classroom-grade/download-student-list-template/${pid}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        window.open(res.data.resValue.url);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const downloadGradeBoard = () => {
    axiosApiCall(
      `classroom-grade/download-student-grade-board/${pid}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        window.open(res.data.resValue.url);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const importStudent = () => {
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile, selectedFile.name);

    // Request made to the backend api
    // Send formData object
    axiosApiCall(
      `classroom-grade/upload-student-list/${pid}`,
      "post",
      headers,
      formData
    )
      .then((res) => {
        updateData(res);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const importGradeBoard = () => {
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile, selectedFile.name);

    // Request made to the backend api
    // Send formData object
    axiosApiCall(
      `classroom-grade/upload-student-grade-board/${pid}`,
      "post",
      headers,
      formData
    )
      .then((res) => {
        updateData(res);
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
  function onFileChange(event) {
    // Update the state
    setSelectedFile(event.target.files[0]);
  }

  const updateData = async (res) => {
    let tempCol = [
      { key: "name", id: "" },
      { key: "code", id: "" },
    ];

    setListGrade(res.data.resValue.grades);
    const tempAssignment = res.data.resValue.assignments;
    tempAssignment.forEach((assignmentID) => {
      const assignment = assignmentID.assignmentId;
      let temp = {
        key: `${assignment.name}`,
        id: `${assignment._id}`,
        is_finallized: assignmentID.is_finallized,
      };
      tempCol.push(temp);
    });
    setColumn(tempCol);

    const tempRow = [];
    const tempGrade = res.data.resValue.grades;
    tempGrade.forEach((grade) => {
      tempRow.push(grade);
    });

    setRow(tempRow);
  };

  return (
    <>
      <TopBarClassDetail></TopBarClassDetail>
      <div className={gradeStyle.container}>
        <Paper sx={{ width: "80%", overflow: "hidden" }}>
          <Grid container>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Link
                href={{
                  pathname: `/classroom/grade/reviewTeacher/${pid}`,
                  query: {
                    /*assignmentId: assignment._id,
                    name: assignment.name,
                    point: assignment.is_finallized
                      ? listGrade[assignment.name]
                      : "**",
                    is_finallized: assignment.is_finallized,*/
                  },
                }}
              >
                <a>
                  <Button
                    variant="contained"
                    color="error"
                    className={gradeStyle.button}
                  >
                    Xem Yêu Cầu Phúc Khảo
                  </Button>
                </a>
              </Link>
            </Grid>
          </Grid>
          <form>
            <Controller
              name={"textValue"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <TableContainer>
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      style={{ borderCollapse: "collapse" }}
                    >
                      <TableHead className={gradeStyle.tableHead}>
                        <TableRow>
                          {columns.map((column, posCol) =>
                            posCol == 0 || posCol == 1 ? (
                              <TableCell
                                key={posCol}
                                className={gradeStyle.headerName}
                              >
                                <span className={gradeStyle.headerLabel}>
                                  {studentInfor[posCol]}
                                </span>
                              </TableCell>
                            ) : (
                              <TableCell
                                key={posCol}
                                className={gradeStyle.header}
                              >
                                <span className={gradeStyle.headerLabel}>
                                  {column.key}
                                </span>
                                <MenuList
                                  id={column.id}
                                  mark_assignment_finallized={
                                    mark_assignment_finallized
                                  }
                                  exportFile_SpecGrade={exportFile_SpecGrade}
                                  classStyle={gradeStyle.moreOption}
                                  is_finallized={column.is_finallized}
                                ></MenuList>
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
                                  const value = row[column.key];
                                  const pos = posRow + "_" + posCol;

                                  return posCol == 0 || posCol == 1 ? (
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
                </div>
              )}
            />
          </form>
        </Paper>
      </div>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
      <FileData selectedFile={selectedFile} />
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit(onSubmit)}
          className={gradeStyle.button}
        >
          Lưu điểm
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={gradeStyle.button}
          onClick={downloadTemplate}
        >
          Download Template
        </Button>
        <Button
          variant="contained"
          className={gradeStyle.button}
          onClick={importStudent}
        >
          Import Sinh Viên
        </Button>
        <Button
          variant="contained"
          color="error"
          className={gradeStyle.button}
          onClick={downloadGradeBoard}
        >
          Export Bảng Điểm
        </Button>
        <Button
          variant="contained"
          color="warning"
          className={gradeStyle.button}
          onClick={importGradeBoard}
        >
          Import Bảng Điểm
        </Button>
      </div>
    </>
  );
}
