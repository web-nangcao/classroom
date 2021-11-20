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
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Image
              src="/images/contentAttach.png" // Route of the image file
              height={70} // Desired size with correct aspect ratio
              width={120} // Desired size with correct aspect ratio
              alt="Avatar"
            />
          </Grid>
          <Grid item xs={8}>
            <p>Content Attached</p>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
