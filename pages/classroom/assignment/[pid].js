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

    // CHECK STUDEN REDIRECT

    const user = JSON.parse(Cookie.get("user"))
    // console.log("heelafd",user);
    const data_get_user ={
      email:user.email ,
      classroomId:pid ,
    }
    axiosApiCall(`user/get-usertype`, "post", headers, data_get_user)
      .then((res) => {
          if(res.data == "Student"){
            router.push(`/classroom/detail/${pid}`);
          }
      })
      .catch(function (error) {
        console.log("B??? l???i t???i");
        if (error.response) {
          console.log(error);
        }
      });


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
            _id: item._id,
            id: item._id,
          };
          list_assigments.push(temp_assignment);
          console.log(list_assigments);
        });
        setItems(list_assigments);
      })
      .catch(function (error) {
        console.log("B??? l???i t???i");
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
        id: `item-${Math.random()}`,
        name: "",
        point: "0",
        _id: null,
      },
    ]);
    setItems(items_m);
  }
  function removeAssignment(id) {
    let items_m = items;
    items_m = items_m.filter((item, index) => item.id != id);
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
        console.log("assignment r???ng");
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
          _id: item._id,
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
          const list_assigments = [];
          console.log("respone", res.data);
          console.log("assginment", res.data.assignments);

          const returnedAssignment = res.data.assignments;

          returnedAssignment.map((item, pos) => {
            let temp_assignment = {
              name: items[pos].name,
              point: items[pos].point,
              email: items[pos].email,
              classroomId: pid,
              _id: item,
              id: item,
            };
            list_assigments.push(temp_assignment);
            console.log(list_assigments);
          });
          setItems(list_assigments);
          setWarning(false);
          setSuccess(true);
        })
        .catch(function (error) {
          console.log("Kh??ng th??? truy c???p");
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
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        label="Lo???i B??i T???p"
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
                        label="??i???m"
                        name="point"
                        autoComplete="point"
                        autoFocus
                        defaultValue={item.point}
                        onChange={(e) =>
                          changeAssignmentPoint(e.target.value, index)
                        }
                        ref={ref}
                      />

                      <Button onClick={() => removeAssignment(item.id)}>
                        X??a
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              <div className={assignStyle.alertWrapper}>
                {isWaringAlert && (
                  <Alert severity="warning" className={assignStyle.alert}>
                    Vui l??ng ??i???n ?????y ????? th??ng tin
                  </Alert>
                )}

                {isSuccessfullAlert && (
                  <Alert severity="success" className={assignStyle.alert}>
                    L??u L???i Th??nh C??ng
                  </Alert>
                )}
              </div>
              <div className={assignStyle.buttonWrapper}>
                <Button
                  variant="contained"
                  onClick={createAssignment}
                  className={assignStyle.buttonAdd}
                >
                  Th??m B??i M???i
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  className={assignStyle.buttonAdd}
                  onClick={saveHandle}
                >
                  L??u L???i
                </Button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
