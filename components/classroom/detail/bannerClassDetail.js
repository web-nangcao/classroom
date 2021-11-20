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
          width: "100%",
          height: "250px",
        },
        verticalAlign: "bottom",
        marginBottom: "20px",
      }}
    >
      <Paper
        elevation={3}
        style={{
          backgroundImage: `url("/images/banner1.jpg")`,
          backgroundSize: "cover",
          color: "white",
          fontSize: "35px",
          fontWeight: "bolder",
          padding: "170px 0 0 50px",
        }}
      >
        [CQ] PTUDWNC - 18 _3 PTUDWNC{" "}
      </Paper>{" "}
    </Box>
  );
}
