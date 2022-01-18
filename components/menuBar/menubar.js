import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import DialpadIcon from "@mui/icons-material/Dialpad";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { styled } from "@mui/material/styles";

import menuBarStyle from "./menuBar.module.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function MenuBar() {
  return (
    <Box sx={{ flexGrow: 1 }} className={menuBarStyle.menuBar}>
      {/* <Grid container spacing={2}>
        <Grid item>
          <Button variant="outlined" startIcon={<AssignmentIcon />}>
            To do
          </Button>{" "}
        </Grid>{" "}
        <Grid item>
          <Button variant="outlined" startIcon={<ReviewsIcon />}>
            To review{" "}
          </Button>{" "}
        </Grid>{" "}
        <Grid item>
          <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
            Calendar{" "}
          </Button>{" "}
        </Grid>{" "}
        <Grid item> </Grid>{" "}
      </Grid>{" "} */}
    </Box>
  );
}
