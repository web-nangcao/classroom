import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "auto",
        },
      }}
    >
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item container xs={12}>
            <Grid item xs={1}>
              ava
            </Grid>
            <Grid item xs={10}>
              name teacher
            </Grid>
            <Grid item xs={1}>
              coppy icon
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {" "}
            Description
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              content 1
            </Grid>
            <Grid item xs={6}>
              content 2
            </Grid>
            <Grid item xs={6}>
              content 3
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={1}>
              ava
            </Grid>
            <Grid item xs={11}>
              comment
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
