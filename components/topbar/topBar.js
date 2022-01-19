import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/IconButton";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Cookie from "js-cookie";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";

import NotificationsIcon from '@mui/icons-material/Notifications';

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";

import DrawerLeftSide from "./drawerLeftSide";

import { styled } from "@mui/material/styles";

import topBarStyle from "./topBar.module.css";

import AddClassDialog from "./addClassDialog";

import LogoutBtn from "../logout/logout";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });
export default function TopBar({ handleAddClass }) {
  const [anchorAdd, setAnchorAdd] = useState(null);

  const isMenuOpen = Boolean(anchorAdd);

  const [open, setOpen] = React.useState(false);

  const [notiList, setNotiList] = useState([]);


  const handleProfileMenuOpen = (event) => {
    setAnchorAdd(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorAdd(null);
  };

  const joinClassClick = () => {
    setAnchorAdd(null);
  };
  const createClassClick = () => {
    setAnchorAdd(null);
  };
  const menuId = "primary-search-account-menu";
  const AddMenu = (
    <Menu
      anchorEl={anchorAdd}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={joinClassClick}>Join Class</MenuItem>
      <MenuItem onClick={createClassClick}>
        <AddClassDialog handleAddClass={handleAddClass}></AddClassDialog>
      </MenuItem>
    </Menu>
  );

  const handleClickOpen = (id) => {

    const access_token = "Bearer " + Cookie.get("accesstoken");
    const headers = { authorization: access_token };

    axiosApiCall("notification/get-notifications", "get", headers, {})
      .then((res) => {
        console.log(res);
        let data = res.data;
        if (data) {
          let type = "";
          let classname = "";
          let content = "";
          let noti_arr = [];

          data.map(function (noti) {

            if (noti.notificationType == "teacher_reply_review") {
              type = "Giáo viên trả lời review";
              classname = noti.classroomId.className;
              content = noti.content;
            }

            if (noti.notificationType == "teacher_finallized_grade") {
              type = "Giáo viên mới đăng điểm";
              classname = noti.classroomId.className;
              content = noti.content;
            }


            if (noti.notificationType == "teacher_create_upd_grade") {
              type = "Giáo viên cập nhập điểm";
              classname = noti.classroomId.className;
              content = noti.content;
            }


            if (noti.notificationType == "student_request_review") {
              type = "Học sinh khiếu nại điểm";
              classname = noti.classroomId.className;
              content = noti.content;
            }


            noti_arr.push({
              classname: classname,
              content: content,
              type: type,
            })
          })

          setNotiList(noti_arr);
        }
      })
      .catch(function (error) {
        //console.log("erpr");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={topBarStyle.topBarContainer}>
      <Paper className={topBarStyle.topBarContainer}>
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
              <Link href="/classroom">
                <a className={topBarStyle.ClassVipPro}>Class Vip Pro</a>
              </Link>
            </Grid>
            <Grid item xs={0.5} className={topBarStyle.topBarItem}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={0.5} className={topBarStyle.topBarItem}>
              <NotificationsIcon onClick={handleClickOpen}></NotificationsIcon>

            </Grid>
            <Grid item xs={0.5} className={topBarStyle.topBarItem}>
              <Link href="/profile">
                <a>
                  <AccountCircleIcon> </AccountCircleIcon>
                </a>
              </Link>
            </Grid>
            <Grid item xs={1} className={topBarStyle.topBarItem}>
              <LogoutBtn />
            </Grid>
            {AddMenu}
          </Grid>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><NotificationsIcon sx={{ pt: 0.8 }} onClick={handleClickOpen}></NotificationsIcon>Thông báo</DialogTitle>
        <DialogContent >
          <Box width={350}>
            <Grid item xs={12}>
              {notiList.map((noti, index) => (
                <Grid key={index} sx={{ mb: 3, border: 1, p: 1, borderColor: 'grey.400', borderRadius: 3 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 1, md: 1 }}
                  >
                    <Item>Lớp : <b>{noti.classname}</b></Item>
                    <Item>Loại :  <b>{noti.type}</b></Item>
                    <Item>Nội dung :  <b>{noti.content}</b></Item>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: '15px' }}   >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
