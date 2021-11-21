import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";

import personStyle from "./person.module.css";

export default function Person({ personName }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Image
            src="/images/teacher.jpg" // Route of the image file
            height={50} // Desired size with correct aspect ratio
            width={50} // Desired size with correct aspect ratio
            alt="Avatar"
            className={personStyle.image}
          />
        </Grid>
        <Grid item xs={11} className={personStyle.personName}>
          <p>{personName}</p>
        </Grid>
      </Grid>
    </>
  );
}
