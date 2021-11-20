import React from "react";
import Grid from "@mui/material/Grid";

export default function Person() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1.5}>
          Avatar
        </Grid>
        <Grid item xs={10.5}>
          person name
        </Grid>
      </Grid>
    </>
  );
}
