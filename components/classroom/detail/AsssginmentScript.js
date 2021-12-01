import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Image from "next/image";

export default function Assignment({ assignments }) {
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
        <h2>Assignment</h2>
        {assignments.map((assignment, index) => {
          return (
            <p key={index} style={{ color: "blue", fontWeight: "bold" }}>
              {assignment.name} ({assignment.point})
            </p>
          );
        })}
      </Paper>
    </Box>
  );
}
