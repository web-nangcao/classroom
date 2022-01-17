import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import DialpadIcon from "@mui/icons-material/Dialpad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";

import DrawerLeftSide from "./drawerLeftSide";

import { styled } from "@mui/material/styles";

import topBarClassDetailStyle from "./topBarClassDetail.module.css";
import Cookie from "js-cookie";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TopBarClassDetail({ id }) {
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [classID, setClassID] = useState("");

  const isMenuOpen = Boolean(anchorAdd);

  const handleProfileMenuOpen = (event) => {
    setAnchorAdd(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorAdd(null);
  };

  useEffect(() => {
    if (Cookie.get("classID") !== undefined) {
      const ID = JSON.parse(Cookie.get("classID"));
      setClassID(ID);
    }
  });
  const menuId = "primary-search-account-menu";
  return (
    <Paper className={topBarClassDetailStyle.container}>
      <Box
        sx={{ flexGrow: 1 }}
        className={topBarClassDetailStyle.topbar}
        display="flex"
        justifyContent="center"
      >
        <Grid container spacing={2}>
          <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
            <DrawerLeftSide> </DrawerLeftSide>
          </Grid>
          <Grid item xs={3} className={topBarClassDetailStyle.topBarItem}>
            <Link href="/classroom">
              <a className={topBarClassDetailStyle.ClassVipPro}>
                Class Vip Pro
              </a>
            </Link>
          </Grid>
          <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
            {classID !== "" ? (
              <Link href={`/classroom/detail/${classID}`}>
                <a className={topBarClassDetailStyle.menuItem}>Tất Cả</a>
              </Link>
            ) : (
              <Link href={`/classroom`}>
                <a className={topBarClassDetailStyle.menuItem}>Tất Cả</a>
              </Link>
            )}
          </Grid>
          <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
            {classID !== "" ? (
              <Link href={`/classroom/assignment/${classID}`}>
                <a className={topBarClassDetailStyle.menuItem}>Bài Học</a>
              </Link>
            ) : (
              <Link href={`/classroom`}>
                <a className={topBarClassDetailStyle.menuItem}>Bài Học</a>
              </Link>
            )}
          </Grid>
          <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
            <Link href={`/classroom/grade/${classID}`}>
              <a className={topBarClassDetailStyle.menuItem}> Quản lý điểm</a>
            </Link>
          </Grid>
          <Grid item xs={1} className={topBarClassDetailStyle.topBarItem}>
            <Link href={`/classroom/studentGrade/${classID}`}>
              <a className={topBarClassDetailStyle.menuItem}>Bảng điểm</a>
            </Link>
          </Grid>
          <Grid item xs={3} className={topBarClassDetailStyle.topBarItem}>
            <Link href="/classroom/people">
              <a className={topBarClassDetailStyle.menuItem}>Người tham dự</a>
            </Link>
          </Grid>

          <Grid item xs={0.5} className={topBarClassDetailStyle.topBarItem}>
            <DialpadIcon> </DialpadIcon>
          </Grid>
          <Grid item xs={0.5} className={topBarClassDetailStyle.topBarItem}>
            <Link href="/profile">
              <a>
                <AccountCircleIcon> </AccountCircleIcon>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
