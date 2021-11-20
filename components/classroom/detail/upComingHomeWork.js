import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Image from "next/image";

export default function Lesson() {
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
      <Paper elevation={3} style={{ padding: "10px" }}>
        <h2>Up coming</h2>
        <p>Due Wednesday 10:00 PM – Đồ án giữa kỳ</p>
        <p style={{ color: "blue", position: "relative", left: "200px" }}>
          View all
        </p>
      </Paper>
    </Box>
  );
}
