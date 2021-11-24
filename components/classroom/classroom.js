import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import Image from "next/image";
import Link from "next/link";

import ClassroomStyle from "./classroom.module.css";

import Expire from "./Expire";

export default function ClassRoom({ classroom, isHosted }) {
  const [alert, setAlert] = useState(false);
  const textAreaRef = useRef(null);
  let timer;
  function copyToClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = `${process.env.NEXT_PUBLIC_FRONT_END}/classroom/invite/${value}?classID=${classroom._id}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setAlert(true);
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      setAlert(false);
    }, 1000);
  }

  return (
    <Card sx={{ maxWidth: "380px" }} className={ClassroomStyle.cardClassroom}>
      <Link href={`classroom/detail/${classroom._id}`}>
        <a>
          <CardMedia
            component="img"
            alt="green iguana"
            image="/images/reactAva.jpg"
            className={ClassroomStyle.cardHeader}
          />
          <CardContent className={ClassroomStyle.cardContent}>
            <Typography gutterBottom variant="h5" component="div">
              {classroom.className}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Topic: {classroom.topic}
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={9} className={ClassroomStyle.personName}>
                <Typography variant="body2" color="text.secondary">
                  Host: {classroom.host}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Image
                  src="/images/teacher.jpg" // Route of the image file
                  height={70} // Desired size with correct aspect ratio
                  width={70} // Desired size with correct aspect ratio
                  alt="Avatar"
                  className={ClassroomStyle.image}
                />
              </Grid>
            </Grid>
          </CardContent>
        </a>
      </Link>
      {isHosted ? (
        <>
          {" "}
          <CardActions className={ClassroomStyle.cardFooter}>
            <Button
              size="small"
              onClick={() => copyToClipboard("Teacher")}
              variant="outlined"
            >
              Mời giáo viên
            </Button>
            <Button
              size="small"
              onClick={() => copyToClipboard("Student")}
              variant="outlined"
            >
              Mời học sinh
            </Button>
          </CardActions>
          {alert ? (
            <div className={ClassroomStyle.alert}>Đã sao chép link</div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
