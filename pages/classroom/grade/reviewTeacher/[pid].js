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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";

import axios from "axios";

import TopBarClassDetail from "../../../../components/topBarClassDetail/topBarClassDetail";

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
  const router = useRouter();
  const { pid } = router.query;
  const { register, handleSubmit, reset, control } = useForm();

  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);
  const [overal, setOveral] = useState("");
  const [userType, setUserType] = useState(Cookie.get("userType"));

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const [className, setClassName] = useState("");

  const [listReview, setListReview] = useState([]);

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
    const data = { classroomId: pid };
    axiosApiCall(
      `student-review/teacher-get-reviews/${pid}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        const listReviewReturn = res.data;
        const tempListReview = [];

        let classroomName = "";
        listReviewReturn.forEach((review) => {
          let studentcode = "";
          review.classroomId.members.forEach((member) => {
            if (member.email == review.studentId.email) {
              studentcode = member.code;
            }
          });
          const temp = {
            studentId: review.studentId._id,
            classroomId: review.classroomId._id,

            assignmentID: review.assignmentId._id,
            assignmentName: review.assignmentId.name,
            code: studentcode,
            currentGrade: review.cur_grade,
            expectGrade: review.exp_grade,
            explain: review.explain,
            is_finallized: review.is_finallized,
          };
          tempListReview.push(temp);
          classroomName = review.classroomId.className;
        });
        setClassName(classroomName);

        setListReview(tempListReview.reverse());
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

            <p className={gradeStyle.header}>Danh Sách Phúc Khảo</p>
            <Grid container>
              <Grid item xs={7}>
                <p className={gradeStyle.info}></p>
                <p className={gradeStyle.info}></p>
              </Grid>
              <Grid>
                <p className={gradeStyle.info}>
                  Môn học:{" "}
                  <span className={gradeStyle.className}>{className}</span>
                </p>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Số Sinh Viên</TableCell>
                    <TableCell>Loại Điểm</TableCell>
                    <TableCell align="right">Điểm Hiện Tại</TableCell>
                    <TableCell align="right">Điểm Mong Muốn</TableCell>
                    <TableCell align="right">Đã giải quyết</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listReview.reverse().map((review, pos) => (
                    <TableRow
                      key={review.assignmentID + pos}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {review.code}
                      </TableCell>
                      <TableCell>{review.assignmentName}</TableCell>

                      <TableCell align="right">{review.currentGrade}</TableCell>
                      <TableCell align="right">{review.expectGrade}</TableCell>
                      <TableCell align="right">
                        <Link
                          href={{
                            pathname: `/classroom/studentGrade/review/${pid}`,
                            query: {
                              assignmentId: review.assignmentID,
                              name: review.assignmentName,
                              point: review.currentGrade,
                              is_finallized: review.is_finallized,
                              studentId: review.studentId,
                            },
                          }}
                        >
                          <a>
                            {review.is_finallized ? (
                              <CheckCircleIcon color="success"></CheckCircleIcon>
                            ) : (
                              <CheckCircleIcon> </CheckCircleIcon>
                            )}
                          </a>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Paper>
      </div>
    </>
  );
}
