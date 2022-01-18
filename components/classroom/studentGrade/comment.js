import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import commentStyle from "./comment.module.css";

export default function Comment({ content, personName }) {
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Grid item container xs={12}>
        <Grid item xs={1}>
          <Image
            src="/images/teacher.jpg" // Route of the image file
            height={50} // Desired size with correct aspect ratio
            width={50} // Desired size with correct aspect ratio
            alt="Avatar"
            className={commentStyle.image}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={11.5}>
              <div className={commentStyle.personName}>{personName}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={11.5}>
              <div className={commentStyle.comment}>{content}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
