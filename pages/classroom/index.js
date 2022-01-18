import React, { useState, useEffect, useLayoutEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import Grid from "@mui/material/Grid";

import styles from "../../styles/Home.module.css";

import Layout from "../../components/layout";

import TopBar from "../../components/topbar/topBar";
import MenuBar from "../../components/menuBar/menubar";
import ClassRoom from "../../components/classroom/classroom";
import { useRouter } from "next/router";

import libClassroom from "../../lib/classroom";

import Cookie from "js-cookie";
import axios from "axios";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

export async function getStaticProps() {
  const listClassTest = libClassroom;

  return {
    props: {
      listClassTest,
    },
  };
}

export default function ClassRoomPage({ listClassTest }) {
  const router = useRouter();

  const [listClass, setlistClass] = useState([]);
  const [user, setUser] = useState({});
  useLayoutEffect(() => {
    Cookie.set("prePath", "/classroom");
    if (!Cookie.get("accesstoken")) {
      console.log("ủa");
      router.push("/login");
    } else {
      console.log("Asf");

      setUser(JSON.parse(Cookie.get("user")));

      const access_token = "Bearer " + Cookie.get("accesstoken");
      const headers = { authorization: access_token };

      axiosApiCall("", "get", headers, {})
        .then((res) => {
          if (res !== {}) {
            const allClassFromApi = res.data.resValue.classrooms;
            setlistClass(allClassFromApi);
            const classID_array = [];
            allClassFromApi.map((classroom) => {
              classID_array.push(classroom._id);
            });
            Cookie.set("classID_array", JSON.stringify(classID_array));
          } else {
            //console.log("khong nhan dc class lít");
          }
        })
        .catch(function (error) {
          //console.log("erpr");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  }, []);

  const handleAddClass = (newClass) => {
    //console.log(newClass);
    const access_token = "Bearer " + Cookie.get("accesstoken");
    const headers = { authorization: access_token };
    if (newClass.txtClassName !== "" && newClass.txtTopic !== "") {
      const data = {
        className: newClass.txtClassName,
        topic: newClass.txtTopic,
      };

      axiosApiCall("create", "post", headers, data)
        .then((res) => {
          console.log("response:");
          //console.log(res.data.resValue);
          const newClassList = JSON.parse(JSON.stringify(listClass));
          newClassList.push(res.data.resValue.classroom);
          setlistClass(newClassList);
          //console.log(newClassList);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  };
  return (
    <Layout>
      <>
        <div className={styles.container}>
          <Head>
            <title> Class List </title>{" "}
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <TopBar handleAddClass={handleAddClass}> </TopBar>
          <MenuBar> </MenuBar>{" "}
          <Grid container>
            {listClass.map((classRoom, index) => {
              const isHosted = classRoom.host === user.email;
              //console.log(classRoom.host);
              ///console.log(user.email);
              return (
                <Grid item xs={3} key={index}>
                  <ClassRoom classroom={classRoom} isHosted={isHosted}>
                    {" "}
                  </ClassRoom>{" "}
                </Grid>
              );
            })}
          </Grid>
        </div>
      </>{" "}
    </Layout>
  );
}
