import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import AddIcon from "@mui/icons-material/Add";
import DialpadIcon from "@mui/icons-material/Dialpad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import DrawerLeftSide from "./drawerLeftSide";

import { styled } from "@mui/material/styles";

import topBarStyle from "./topBar.module.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function TopBar() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className={topBarStyle.topbar}
      display="flex"
      justifyContent="center"
    >
      <Grid container spacing={2}>
        <Grid item xs={1} className={topBarStyle.topBarItem}>
          <DrawerLeftSide></DrawerLeftSide>
        </Grid>
        <Grid item xs className={topBarStyle.topBarItem}>
          Classroom Vip pro
        </Grid>
        <Grid item xs={0.5} className={topBarStyle.topBarItem}>
          <AddIcon></AddIcon>
        </Grid>
        <Grid item xs={0.5} className={topBarStyle.topBarItem}>
          <DialpadIcon></DialpadIcon>
        </Grid>
        <Grid item xs={0.5} className={topBarStyle.topBarItem}>
          <AccountCircleIcon></AccountCircleIcon>
        </Grid>
      </Grid>
    </Box>
  );
}
