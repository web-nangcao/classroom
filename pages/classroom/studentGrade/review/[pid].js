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
import { Grid } from "@mui/material";
import Image from "next/dist/client/image";

import gradeStyle from "./[pid].module.css";
import Cookie from "js-cookie";

import axios from "axios";

import TopBarClassDetail from "../../../../components/topBarClassDetail/topBarClassDetail";
import Comment from "../../../../components/classroom/studentGrade/comment";

import Review from "../../../../components/classroom/studentGrade/review/Review";
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

export async function getServerSideProps(context) {
  console.log(context.query);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      query: context.query, //pass it to the page props
    },
  };
}

export default function StickyHeadTable(props) {
  const router = useRouter();
  const { pid } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);
  const [overal, setOveral] = useState(0);
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
    const access_token = "Bearer " + Cookie.get("accesstoken");
    const headers = { authorization: access_token };
    axiosApiCall(
      `student-reviewe/comment-review`,
      "post",
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
  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };

  useEffect(() => {
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/detail/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }
    console.log(props);
    console.log("use effect Student Review");

    axiosApiCall(
      `student-review/student-get-reviews/${pid}`,
      "get",
      headers,
      []
    )
      .then((res) => {
        console.log("respone", res.data);
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

  const submitReview = (data) => {
    console.log(data);
    const req = {
      classroomId: pid,
      assignmentId: props.query.assignmentId,
      cur_grade: props.query.point,
      exp_grade: data.txtGrade,
      explain: data.txtComment,
    };
    console.log(req);
    axiosApiCall(`student-review/student-create-review`, "post", headers, req)
      .then((res) => {
        console.log("respone", res.data);
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
  const handleProfileMenuOpen = (event) => {
    setAnchorAdd(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorAdd(null);
  };
  return (
    <>
      <TopBarClassDetail></TopBarClassDetail>
      <div className={gradeStyle.content}>
        <div className={gradeStyle.main}>
          <div className={gradeStyle.container}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                justifyContent: "center",
              }}
            >
              <p className={gradeStyle.header}> Phúc Khảo</p>
              <Review submitReview={submitReview}></Review>
              <TableContainer
                component={Paper}
                className={gradeStyle.gradeBoard}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Loại điểm</TableCell>
                      <TableCell align="right">Điểm hiện tại</TableCell>
                      <TableCell align="right">Điểm mong đợi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {props.query.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {props.query.point}
                      </TableCell>
                      <TableCell align="right" align="right">
                        100
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
          <div className={gradeStyle.buttonSpace}>
            <Button
              variant="contained"
              color="success"
              className={gradeStyle.button}
            >
              Chấp Nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              className={gradeStyle.button}
            >
              Từ Chối
            </Button>
            <Button variant="contained" className={gradeStyle.button}>
              Chấm Lại
            </Button>
          </div>
          <div className={gradeStyle.userComment}>
            <Grid item container xs={12}>
              <Grid item xs={1}>
                <Image
                  src="/images/teacher.jpg" // Route of the image file
                  height={50} // Desired size with correct aspect ratio
                  width={50} // Desired size with correct aspect ratio
                  alt="Avatar"
                  className={gradeStyle.image}
                />
              </Grid>
              <Grid item xs={10}>
                <form>
                  <Grid container>
                    <Grid item xs={11.5}>
                      <Controller
                        name={"textValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              id="outlined-required"
                              label="Thêm Bình Luận"
                              defaultValue=""
                              onChange={onChange}
                              style={{ width: "100%" }}
                            />
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={0.5}>
                      <Button onClick={handleSubmit(onSubmit)}>Gửi</Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
          <div className={gradeStyle.comment}>
            <Comment></Comment>
          </div>
          <div className={gradeStyle.comment}>
            <Comment></Comment>
          </div>
          <div className={gradeStyle.comment}>
            <Comment></Comment>
          </div>
        </div>
      </div>
    </>
  );
}
