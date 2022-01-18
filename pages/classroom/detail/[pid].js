import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import styles from "../../../styles/util.module.css";

import Layout from "../../../components/layout";

import TopBarClassDetail from "../../../components/topBarClassDetail/topBarClassDetail";
import MenuBar from "../../../components/menuBar/menubar";
import ClassRoom from "../../../components/classroom/classroom";
import Lesson from "../../../components/classroom/detail/lesson";
import Banner from "../../../components/classroom/detail/bannerClassDetail";
import Upcoming from "../../../components/classroom/detail/upComingHomeWork";
import Assignment from "../../../components/classroom/detail/AsssginmentScript";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import libClassroom from "../../../lib/classroom";
import axios from "axios";
import Cookie from "js-cookie";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

export default function ClassroomDetailPage() {
  //classDetail = { host: "DuongBoiLong", className: "ABCxyz" };
  const router = useRouter();
  const { pid } = router.query;
  //console.log("pid: " + pid);
  //   const listLesson = [
  //     { personPost: classDetail.host },
  //     { personPost: classDetail.host },
  //     { personPost: classDetail.host },
  //     { personPost: classDetail.host },
  //   ];
  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };
  const [classDetail, setClassDetail] = useState({});
  const [listLesson, setListLesson] = useState([]);

  const assignments = [1, 2, 3, 4];

  const [loadingPage, setLoadingPage] = useState(true);
  const [userType, setUserType] = useState("");
  const [code, setCode] = useState("");

  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    const mappingData = { code: data.code, classroomId: pid };
    axiosApiCall(`mapping-student-code`, "post", headers, mappingData)
      .then((res) => {
        console.log("tra ve");
        console.log(res.data);
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
    //console.log("hello");
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/detail/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }
    //console.log("check join class");
    // console.log(Cookie.get("joinClass"));

    if (Cookie.get("joinClass") != undefined) {
      //console.log("json parse join class");
      //console.log(JSON.parse(Cookie.get("joinClass")));

      axiosApiCall(
        `join-class`,
        "post",
        headers,
        JSON.parse(Cookie.get("joinClass"))
      )
        .then((res) => {
          const classDetailTemp = res.data.resValue.classroom;
          console.log("assignment");
          console.log(classDetailTemp.assignments);
          setClassDetail(classDetailTemp);

          const listLessonTemp = [
            { id: 1, personPost: classDetailTemp.host },
            { id: 2, personPost: classDetailTemp.host },
            { id: 3, personPost: classDetailTemp.host },
            { id: 4, personPost: classDetailTemp.host },
          ];
          setListLesson(listLessonTemp);
          setLoadingPage(false);
          Cookie.set("classID", JSON.stringify(classDetailTemp._id));
          Cookie.set("classDetail", JSON.stringify(classDetailTemp));
        })
        .catch(function (error) {
          console.log("lỗi rồi nè má");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
    //console.log(access_token);
    //console.log(pid);
    axiosApiCall(`get-class-detail/${pid}`, "get", headers, {})
      .then((res) => {
        const classDetailTemp = res.data.resValue.classroom;
        console.log("respone", res.data);
        const members = res.data.resValue.classroom.members;
        const user = JSON.parse(Cookie.get("user"));
        console.log("user", user);
        members.forEach((member) => {
          if (member.email == user.email) {
            Cookie.set("userType", member.userType);
            Cookie.set("code", member.code);
            setUserType(member.userType);
            setCode(member.code);
          }
        });
        console.log("userType", Cookie.get("userType"));
        console.log("code", Cookie.get("code"));

        console.log("assignment");
        console.log(classDetailTemp.assignments);
        setClassDetail(classDetailTemp);

        const listLessonTemp = [
          { personPost: classDetailTemp.host },
          { personPost: classDetailTemp.host },
          { personPost: classDetailTemp.host },
          { personPost: classDetailTemp.host },
        ];
        setListLesson(listLessonTemp);
        //console.log(listLesson);
        setLoadingPage(false);
        Cookie.set("classID", JSON.stringify(classDetailTemp._id));
        Cookie.set("classDetail", JSON.stringify(classDetailTemp));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [pid]);

  return (
    <div>
      {!loadingPage ? (
        <Layout>
          <>
            <Head>
              <title>Detail Class</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <TopBarClassDetail id={"123"}></TopBarClassDetail>
            <div className={styles.classContentDetailContainer}>
              <Banner classroomName={classDetail.className}></Banner>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Upcoming></Upcoming>
                  <Assignment
                    assignments={classDetail.assignments}
                  ></Assignment>
                </Grid>
                <Grid item xs={9}>
                  {userType == "Student" && code == "" ? (
                    <form>
                      <Controller
                        name={"textValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              required
                              id="outlined-required"
                              label="Mã số sinh viên: "
                              defaultValue=""
                              {...register("code")}
                              onChange={onChange}
                            />
                          </>
                        )}
                      />
                      <Button onClick={handleSubmit(onSubmit)}>Map</Button>
                    </form>
                  ) : (
                    <></>
                  )}

                  <Stack spacing={2}>
                    {listLesson.map((lesson, index) => {
                      return <Lesson key={index} lesson={lesson}></Lesson>;
                    })}
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </>
        </Layout>
      ) : (
        <></>
      )}
    </div>
  );
}
