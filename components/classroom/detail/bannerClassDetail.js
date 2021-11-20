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
          height: "250px",
        },
        verticalAlign: "bottom",
      }}
    >
      <Paper elevation={3}>[CQ] PTUDWNC - 18_3 PTUDWNC</Paper>
    </Box>
  );
}
