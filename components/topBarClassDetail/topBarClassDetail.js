import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import DialpadIcon from "@mui/icons-material/Dialpad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import DrawerLeftSide from "./drawerLeftSide";

import { styled } from "@mui/material/styles";

import topBarClassDetailStyle from "./topBarClassDetail.module.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function topBarClassDetail() {
  const [anchorAdd, setAnchorAdd] = useState(null);

  const isMenuOpen = Boolean(anchorAdd);

  const handleProfileMenuOpen = (event) => {
    setAnchorAdd(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorAdd(null);
  };
  const menuId = "primary-search-account-menu";
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className={topBarClassDetailStyle.topbar}
      display="flex"
      justifyContent="center"
    >
      <Grid container spacing={2}>
        <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
          <DrawerLeftSide> </DrawerLeftSide>{" "}
        </Grid>{" "}
        <Grid item xs={4} className={topBarClassDetailStyle.topBarItem}>
          Classroom Vip pro{" "}
        </Grid>{" "}
        <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
          Stream{" "}
        </Grid>{" "}
        <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
          Classwork{" "}
        </Grid>{" "}
        <Grid item xs={4} className={topBarClassDetailStyle.topBarItem}>
          People{" "}
        </Grid>{" "}
        <Grid item xs={0.5} className={topBarClassDetailStyle.topBarItem}>
          <DialpadIcon> </DialpadIcon>{" "}
        </Grid>{" "}
        <Grid item xs={0.5} className={topBarClassDetailStyle.topBarItem}>
          <AccountCircleIcon> </AccountCircleIcon>{" "}
        </Grid>{" "}
      </Grid>{" "}
    </Box>
  );
}
