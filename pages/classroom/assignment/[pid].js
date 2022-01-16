import { useState, useEffect } from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

import axios from "axios";
import Cookie from "js-cookie";

import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd-next";

import TopBarClassDetail from "../../../components/topBarClassDetail/topBarClassDetail";

import assignStyle from "./[pid].module.css";
import listClass from "../../../lib/classroom";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    _id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  width: "500px",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 516,
});

// export const getStaticPaths = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export async function getStaticProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default function ClassAssignPage() {
  const ref = React.createRef();

  const [isWaringAlert, setWarning] = useState(false);
  const [isSuccessfullAlert, setSuccess] = useState(false);
  const [items, setItems] = useState([]);

  //router
  const router = useRouter();
  const { pid } = router.query;

  //header for request
  const access_token = "Bearer " + Cookie.get("accesstoken");
  const headers = { authorization: access_token };

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/assignment/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }

    const data = { classroomId: pid };

    axiosApiCall(`assignment/get-list`, "post", headers, data)
      .then((res) => {
        const list_assigments = [];
        console.log(list_assigments);
        console.log(res.data.resValue);

        res.data.resValue.forEach((item) => {
          let temp_assignment = {
            name: item.name,
            point: item.point,
            email: item.email,
            classroomId: pid,
            _id: `item-${Math.random()}`,
          };
          list_assigments.push(temp_assignment);
          console.log(list_assigments);
        });
        setItems(list_assigments);
      })
      .catch(function (error) {
        console.log("Bị lỗi tải");
        if (error.response) {
          console.log(error);
        }
      });

    //lay danh sach assignment
  }, [pid]);

  function createAssignment() {
    setWarning(false);
    setSuccess(false);
    let items_m = items.concat([
      {
        _id: `item-${Math.random()}`,
        name: "",
        point: "0",
      },
    ]);
    setItems(items_m);
  }
  function removeAssignment(_id) {
    let items_m = items;
    items_m = items_m.filter((item, index) => item._id != _id);
    setItems(items_m);
  }

  function changeAssignmentName(name, index) {
    let items_m = items;
    items_m[index].name = name;
    setItems(items_m);
  }

  function changeAssignmentPoint(point, index) {
    let items_m = items;
    items_m[index].point = point;
    setItems(items_m);
  }

  function saveHandle() {
    let isFullInfor = true;
    items.forEach((item) => {
      if (item.point == "" || item.name == "") {
        console.log("assignment rỗng");
        setSuccess(false);
        setWarning(true);
        isFullInfor = false;
      }
    });
    if (isFullInfor) {
      console.log(items);
      const assignments = [];
      const email = JSON.parse(Cookie.get("user")).email;
      items.forEach((item) => {
        let temp_assignment = {
          name: item.name,
          point: item.point,
          email: email,
          classroomId: pid,
        };
        assignments.push(temp_assignment);
      });
      const data = { classroomId: pid, assignments: assignments };

      console.log(data);
      axiosApiCall(`assignment/update`, "post", headers, data)
        .then((res) => {
          //const list_assigments = res.data.resValue.assignemt;
          //setItems(list_assigments);
          console.log("thanhcong");
          console.log(res);
          setWarning(false);
          setSuccess(true);
        })
        .catch(function (error) {
          console.log("Không thể truy cập");
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  }

  function onDragEnd(result) {
    setSuccess(false);
    setWarning(false);
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items_m = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(items_m);
  }

  return (
    <>
      <Head>
        <title>People in class</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBarClassDetail></TopBarClassDetail>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              //style={getListStyle(snapshot.isDraggingOver)}
              className={assignStyle.wrapperAssignment}
            >
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      /*style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}*/
                      className={assignStyle.assignment}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id=""
                        label="Loại Bài Tập"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        defaultValue={item.name}
                        onChange={(e) =>
                          changeAssignmentName(e.target.value, index)
                        }
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id=""
                        label="Điểm"
                        name="point"
                        autoComplete="point"
                        autoFocus
                        defaultValue={item.point}
                        onChange={(e) =>
                          changeAssignmentPoint(e.target.value, index)
                        }
                        ref={ref}
                      />

                      <Button onClick={() => removeAssignment(item._id)}>
                        Xóa
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              <div className={assignStyle.alertWrapper}>
                {isWaringAlert && (
                  <Alert severity="warning" className={assignStyle.alert}>
                    Vui lòng điền đầy đủ thông tin
                  </Alert>
                )}

                {isSuccessfullAlert && (
                  <Alert severity="success" className={assignStyle.alert}>
                    Lưu Lại Thành Công
                  </Alert>
                )}
              </div>
              <div className={assignStyle.buttonWrapper}>
                <Button
                  variant="contained"
                  onClick={createAssignment}
                  className={assignStyle.buttonAdd}
                >
                  Thêm Bài Mới
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  className={assignStyle.buttonAdd}
                  onClick={saveHandle}
                >
                  Lưu Lại
                </Button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
