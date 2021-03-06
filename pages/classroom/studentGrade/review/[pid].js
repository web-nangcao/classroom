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
import NewGradePopUp from "../../../../components/classroom/studentGrade/review/newGradePopUp";
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
  const [currentReview, setCurrentReview] = useState(false);
  const [userType, setUserType] = useState(Cookie.get("userType"));
  const [code, setCode] = useState("");
  const [studentID, setStudentID] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [listOldReview, setListOldReview] = useState("");
  const [listFinalizedReview, setListFinalizedReview] = useState([]);
  const [checkAllFinalized, setcheckAllFinalized] = useState(false);
  const onSubmit = (data) => {
    if (data.comment !== "") {
      console.log("hello");
      console.log(data);

      const access_token = "Bearer " + Cookie.get("accesstoken");
      const headers = { authorization: access_token };
      console.log(currentReview.studentReviewId);
      const req = {
        studentReviewId: currentReview.studentReviewId,
        comment: data.comment,
      };
      console.log("rew", req);
      axiosApiCall(`student-review/comment-review`, "post", headers, req)
        .then((res) => {
          console.log("student-review/comment-review");
          console.log(res.data);
          const review = res.data;
          let tempReview = false;
          tempReview = {
            assignmentId: review.assignmentId._id,
            classroomId: review.classroomId._id,
            comments: review.comments.reverse(),
            is_finallized: review.is_finallized,
            cur_grade: review.cur_grade,
            exp_grade: review.exp_grade,
            explain: review.explain,
            studentReviewId: review._id,
          };
          setCurrentReview(tempReview);
        })
        .catch(function (error) {
          console.log("l???i");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
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
    if (userType == "Student") {
      setStudentID(JSON.parse(Cookie.get("user"))._id);
      setCode(Cookie.get("code"));
      console.log(props);
      console.log("use effect Student Review");
      console.log("pid", pid);

      axiosApiCall(
        `student-review/student-get-reviews/${pid}`,
        "get",
        headers,
        []
      )
        .then((res) => {
          console.log("respone hello", res.data);

          let listFinishReview = [];
          res.data.forEach((review) => {
            if (review.assignmentId._id == props.query.assignmentId) {
              if (review.is_finallized == false) {
                console.log("sfds147852");
                console.log("hi");
                let tempReview = false;
                tempReview = {
                  assignmentId: review.assignmentId._id,
                  classroomId: review.classroomId._id,
                  comments: review.comments.reverse(),
                  is_finallized: review.is_finallized,
                  cur_grade: review.cur_grade,
                  exp_grade: review.exp_grade,
                  explain: review.explain,
                  studentReviewId: review._id,
                };
                setCurrentReview(tempReview);
                review.classroomId.members.map((member) => {
                  if (member.email == review.studentId.email) {
                    setCode(member.code);
                  }
                });
              } else {
                console.log("heasfsfsfsdf");
                let tempReview = false;
                tempReview = {
                  assignmentId: review.assignmentId._id,
                  classroomId: review.classroomId._id,
                  comments: review.comments.reverse(),
                  is_finallized: review.is_finallized,
                  cur_grade: review.cur_grade,
                  exp_grade: review.exp_grade,
                  explain: review.explain,
                  studentReviewId: review._id,
                  update_grade: review.upd_grade,
                };
                listFinishReview.push(tempReview);
                console.log("hello");
              }
            }
          });
          setListFinalizedReview(listFinishReview);
          console.log("33333333");
          console.log("*********************", listFinalizedReview);

          console.log("currentReview", currentReview);
        })
        .catch(function (error) {
          console.log("l???i r???i n?? m??");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    } else {
      console.log("hellos");
      console.log(props);
      console.log("use effect Student Review");
      console.log("pid", pid);
      setStudentID(props.query.studentId);

      axiosApiCall(
        `student-review/get-review/${pid}/${props.query.assignmentId}/${props.query.studentId}`,
        "get",
        headers,
        []
      )
        .then((res) => {
          console.log("respone hello", res.data);
          let listFinishReview = [];
          res.data.forEach((review) => {
            if (review.is_finallized === false) {
              setcheckAllFinalized(true);
              console.log("hi");
              let tempReview = false;
              tempReview = {
                assignmentId: review.assignmentId._id,
                classroomId: review.classroomId._id,
                comments: review.comments.reverse(),
                is_finallized: review.is_finallized,
                cur_grade: review.cur_grade,
                exp_grade: review.exp_grade,
                explain: review.explain,
                studentReviewId: review._id,
              };
              setCurrentReview(tempReview);
              review.classroomId.members.map((member) => {
                if (member.email == review.studentId.email) {
                  setCode(member.code);
                }
              });
            } else {
              console.log("heasfsfsfsdf");
              let tempReview = false;
              tempReview = {
                assignmentId: review.assignmentId._id,
                classroomId: review.classroomId._id,
                comments: review.comments.reverse(),
                is_finallized: review.is_finallized,
                cur_grade: review.cur_grade,
                exp_grade: review.exp_grade,
                explain: review.explain,
                studentReviewId: review._id,
                update_grade: review.upd_grade,
              };
              listFinishReview.push(tempReview);
              console.log("hello");
            }
          });
          setListFinalizedReview(listFinishReview);
          console.log("33333333");
          console.log("*********************", listFinalizedReview);

          console.log("currentReview", currentReview);
          console.log("currentReview", currentReview);
        })
        .catch(function (error) {
          console.log("l???i r???i n?? m??");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  }, [pid]);

  const submitReview = (data) => {
    if (data.txtComment !== "") {
      console.log("comment", data.txtComment);
      const req = {
        classroomId: pid,
        assignmentId: props.query.assignmentId,
        cur_grade: props.query.point,
        exp_grade: data.txtGrade,
        explain: data.txtComment,
      };
      console.log(req);
      let studentReviewId = "";
      axiosApiCall(`student-review/student-create-review`, "post", headers, req)
        .then((res) => {
          console.log("studentreview", res.data);
          studentReviewId = res.data._id;
          const data_post_noti = {
            classroomId: pid,
            studentReviewId: studentReviewId,
            notificationType: "student_request_review",
            content: "H???c sinh g???i y??u c???u ph??c kh???o",
          };
          axiosApiCall(`notification/create`, "post", headers, data_post_noti)
            .then((res) => {})
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
          updateData(res);
        })
        .catch(function (error) {
          console.log("l???i r???i n?? m??");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  };

  const updateData = (res) => {
    const review = res.data;
    let tempReview = false;
    tempReview = {
      assignmentId: review.assignmentId._id,
      classroomId: review.classroomId._id,
      comments: review.comments.reverse(),
      is_finallized: review.is_finallized,
      cur_grade: review.cur_grade,
      exp_grade: review.exp_grade,
      explain: review.explain,
      studentReviewId: review._id,
    };
    setCurrentReview(tempReview);
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

  const acceptReview = () => {
    console.log("chap nhan");
    const req = {
      studentReviewId: currentReview.studentReviewId,
      is_finallized: true,
      upd_grade: currentReview.exp_grade,
    };
    console.log(req);
    axiosApiCall(`student-review/mark-finallized`, "post", headers, req)
      .then((res) => {
        updateData(res);
        setIsReviewed(true);
        console.log("respone accept", res.data);
        const data_post_noti = {
          userId: res.data.studentId,
          studentReviewId: res.data._id,
          notificationType: "teacher_reply_review",
          content: "Gi??o vi??n ph???n h???i ph??c kh???o",
        };

        axiosApiCall(`notification/create`, "post", headers, data_post_noti)
          .then((res) => {
            console.log("asfssssf");
          })
          .catch(function (error) {
            console.log("5555555");
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
        console.log("respone accept", res.data);
      })
      .catch(function (error) {
        console.log("l???i r???i n?? m??");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const rejectReview = () => {
    console.log("tu choin");
    console.log("chap nhan");
    const req = {
      studentReviewId: currentReview.studentReviewId,
      is_finallized: true,
      upd_grade: currentReview.cur_grade,
    };
    console.log(req);
    axiosApiCall(`student-review/mark-finallized`, "post", headers, req)
      .then((res) => {
        updateData(res);
        setIsReviewed(true);
        console.log("respone accept", res.data);
        const data_post_noti = {
          userId: res.data.studentId,
          studentReviewId: res.data._id,
          notificationType: "teacher_reply_review",
          content: "Gi??o vi??n ph???n h???i ph??c kh???o",
        };

        axiosApiCall(`notification/create`, "post", headers, data_post_noti)
          .then((res) => {
            console.log("asfssssf");
          })
          .catch(function (error) {
            console.log("5555555");
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
      })
      .catch(function (error) {
        console.log("l???i r???i n?? m??");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const HandleNewGrade = (newGrade) => {
    if (newGrade != "") {
      console.log("cham la");
      console.log("chap nhan");
      const req = {
        studentReviewId: currentReview.studentReviewId,
        is_finallized: true,
        upd_grade: newGrade,
      };
      console.log(req);
      axiosApiCall(`student-review/mark-finallized`, "post", headers, req)
        .then((res) => {
          console.log("asdfsdfsdfsfsf", res.data);
          updateData(res);
          setIsReviewed(true);
          const data_post_noti = {
            userId: res.data.studentId,
            classroomId: pid,
            studentReviewId: res.data._id,
            notificationType: "teacher_create_upd_grade",
            content: "Gi??o vi??n ch???m ??i???m m???i",
          };

          axiosApiCall(`notification/create`, "post", headers, data_post_noti)
            .then((res) => {
              console.log("asfssssf");
            })
            .catch(function (error) {
              console.log("5555555");
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
          console.log("respone accept", res.data);
        })
        .catch(function (error) {
          console.log("l???i r???i n?? m??");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    } else {
      console.log("rong roi ne");
    }
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
              <p className={gradeStyle.header}> Ph??c Kh???o</p>
              <p className={gradeStyle.info}>MSSV: {code}</p>
              {currentReview === false && userType === "Student" ? (
                <Review submitReview={submitReview}></Review>
              ) : (
                <></>
              )}

              <TableContainer
                component={Paper}
                className={gradeStyle.gradeBoard}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lo???i ??i???m</TableCell>
                      <TableCell align="right">??i???m hi???n t???i</TableCell>
                      <TableCell align="right">??i???m mong ?????i</TableCell>
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
                      <TableCell align="right">
                        {currentReview !== false ? currentReview.exp_grade : ""}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
          {checkAllFinalized &&
          userType != "Student" &&
          props.query.point != "**" &&
          isReviewed === false ? (
            <div className={gradeStyle.buttonSpace}>
              <Button
                variant="contained"
                color="success"
                className={gradeStyle.button}
                onClick={acceptReview}
              >
                Ch???p Nh???n
              </Button>
              <Button
                variant="contained"
                color="error"
                className={gradeStyle.button}
                onClick={rejectReview}
              >
                T??? Ch???i
              </Button>

              <NewGradePopUp HandleNewGrade={HandleNewGrade}></NewGradePopUp>
            </div>
          ) : (
            <></>
          )}
          <p>Q??a tr??nh ph??c kh???o</p>
          {listFinalizedReview.map((finalizedReview) => (
            <TableContainer key ={finalizedReview} component={Paper} className={gradeStyle.gradeBoard}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Lo???i ??i???m</TableCell>
                    <TableCell align="right">??i???m hi???n t???i</TableCell>
                    <TableCell align="right">??i???m mong ?????i</TableCell>
                    <TableCell align="right">??i???m cu???i c??ng</TableCell>
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
                    <TableCell align="right">
                      {finalizedReview.exp_grade}
                    </TableCell>
                    <TableCell align="right">
                      {finalizedReview.update_grade}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}

          {currentReview !== false && props.query.point != "**" ? (
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
                                label="Th??m B??nh Lu???n"
                                defaultValue=""
                                onChange={onChange}
                                {...register(`comment`)}
                                style={{ width: "100%" }}
                              />
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item xs={0.5}>
                        <Button onClick={handleSubmit(onSubmit)}>G???i</Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </div>
          ) : (
            <></>
          )}
          {currentReview !== false &&
            currentReview.comments.map((comment) => (
              <div className={gradeStyle.comment} key={comment._id}>
                <Comment
                  content={comment.comment}
                  personName={comment.user._id == studentID ? code : "Teacher"}
                ></Comment>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
