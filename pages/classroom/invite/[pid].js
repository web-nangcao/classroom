import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";

import Style from "./[pid].module.css";

import Layout from "../../../components/layout";

import axios from "axios";
import Cookie from "js-cookie";

import Button from "@mui/material/Button";
import { style } from "@mui/system";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

export default function ClassroomDetailPage() {
  const router = useRouter();
  const { userType, classID } = router.query;

  useEffect(() => {
    if (!userType) {
      return;
    }
  }, [userType]);

  const joinClassHandle = () => {
    //goi api ve cho back end
    //axiosApiCall(`get-class-detail/${pid}`, "get", headers, {});
    //   .then((res) => {
    //     const classDetailTemp = res.data.resValue.classroom;
    //     console.log(classDetailTemp);
    //     setClassDetail(classDetailTemp);
    //     const listLessonTemp = [
    //       { personPost: classDetailTemp.host },
    //       { personPost: classDetailTemp.host },
    //       { personPost: classDetailTemp.host },
    //       { personPost: classDetailTemp.host },
    //     ];
    //     setListLesson(listLessonTemp);
    //     setLoadingPage(false);
    //     Cookie.set("classID", JSON.stringify(classDetailTemp._id));
    //     Cookie.set("classDetail", JSON.stringify(classDetailTemp));
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     }
    //   });

    router.push(`/classroom/detail/${classID}`);
  };

  const gotoHomePageHandle = () => {
    router.push(`/`);
  };

  return (
    <div>
      <Layout>
        <>
          <Head>
            <title>Detail Class</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={Style.buttonWrapper}>
            <h1 className={Style.title}>
              Bạn có muốn tham gia lớp học này không?
            </h1>
            <Button
              variant="contained"
              color="success"
              className={Style.button}
              onClick={joinClassHandle}
            >
              Tham gia ngay
            </Button>
            <Button
              variant="contained"
              className={Style.button}
              onClick={gotoHomePageHandle}
            >
              Về trang chủ
            </Button>
          </div>
        </>
      </Layout>
    </div>
  );
}
