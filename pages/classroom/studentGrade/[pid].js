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
import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Grid from "@mui/material/Grid";

import gradeStyle from "./[pid].module.css";
import Cookie from "js-cookie";
import Link from "next/dist/client/link";

import axios from "axios";

import TopBarClassDetail from "../../../components/topBarClassDetail/topBarClassDetail";

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

const dummy = [
  {
    name: "Cuối kỳ",
    rate: 10,
    point: 100,
  },
  {
    name: "Giữa kỳ",
    rate: 5,
    point: 80,
  },
  {
    name: "Seminar",
    rate: 5,
    point: 90,
  },
  {
    name: "Bài tập về nhà",
    rate: 4,
    point: 80,
  },
  {
    name: "Bài tập tại lớp",
    rate: 4,
    point: 100,
  },
];

export default function StickyHeadTable() {
  const router = useRouter();
  const { pid } = router.query;
  const { register, handleSubmit, reset, control } = useForm();

  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);
  const [overal, setOveral] = useState("");

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [listGrade, setListGrade] = useState([]);

  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };

  useEffect(() => {
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/studentGrade/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }
    console.log("use effect Student Grade");
    const data = { classroomId: pid };
    axiosApiCall(`classroom-grade/student-view-grades`, "post", headers, data)
      .then((res) => {
        if (res.data != false) {
          console.log("respone", res.data);
          const assignmentsReturn = res.data.assignments;
          const ListGradeReturn = res.data.grade;
          const tempAssignmentList = [];
          assignmentsReturn.forEach((assignment) => {
            tempAssignmentList.push({
              ...assignment.assignmentId,
              is_finallized: assignment.is_finallized,
            });
          });
          setAssignments(tempAssignmentList);
          setCode(res.data.grade.code);
          setName(res.data.grade.name);
          setListGrade(ListGradeReturn);
          let sumPoint = 0;
          let sumRate = 0;
          assignmentsReturn.forEach((assignment) => {
            if (assignment.is_finallized) {
              sumPoint +=
                parseInt(assignment.assignmentId.point) *
                parseInt(ListGradeReturn[assignment.assignmentId.name]);
              sumRate += parseInt(assignment.assignmentId.point);
              console.log("sumRate", sumRate);
              console.log("sumPoint", parseInt(assignment.assignmentId.point));
              console.log(
                "sumPointGrade",
                parseInt(ListGradeReturn[assignment.assignmentId.name])
              );
            }
          });
          if (sumRate != 0) {
            console.log("hello");
            setOveral(parseInt(sumPoint / sumRate));
          } else {
            console.log(sumPoint);
            console.log(sumRate);
          }
        }
      })
      .catch(function (error) {
        console.log("lỗi rồi nè má");
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
    <>
      <TopBarClassDetail></TopBarClassDetail>
      <div className={gradeStyle.container}>
        <Paper
          sx={{ width: "70%", overflow: "hidden", justifyContent: "center" }}
        >
          <form>
            <Controller
              name={"textValue"}
              control={control}
              render={({ field: { onChange, value } }) => <></>}
            />

            <p className={gradeStyle.header}>Bảng Điểm Chi Tiết</p>
            <Grid container>
              <Grid item xs={7}>
                <p className={gradeStyle.info}>Họ và Tên: {name}</p>
                <p className={gradeStyle.info}>MSSV: {code}</p>
              </Grid>
              <Grid>
                <p className={gradeStyle.info}>
                  Môn học:{" "}
                  <span className={gradeStyle.className}>
                    Lập Trình ReactJs
                  </span>
                </p>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Loại điểm</TableCell>
                    <TableCell>Tỉ lệ điểm</TableCell>
                    <TableCell align="right">Điểm</TableCell>
                    <TableCell align="right">Phúc khảo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow
                      key={assignment._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {assignment.name}
                      </TableCell>
                      <TableCell>{assignment.point}</TableCell>
                      <TableCell align="right">
                        {assignment.is_finallized
                          ? listGrade[assignment.name]
                          : "**"}
                      </TableCell>

                      <TableCell align="right">
                        <Link
                          href={{
                            pathname: `/classroom/studentGrade/review/${pid}`,
                            query: {
                              assignmentId: assignment._id,
                              name: assignment.name,
                              point: assignment.is_finallized
                                ? listGrade[assignment.name]
                                : "**",
                              is_finallized: assignment.is_finallized,
                            },
                          }}
                        >
                          <a>
                            <HelpOutlineIcon color="secondary" />
                          </a>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow>
                  <TableCell className={gradeStyle.finalScore}>
                    Tổng kết
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right" className={gradeStyle.finalScore}>
                    {overal !== "" ? overal : "**"}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </form>
        </Paper>
      </div>
    </>
  );
}
