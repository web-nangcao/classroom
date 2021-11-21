import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Button } from "@mui/material";
import Image from "next/image";

import lessonStyle from "./lesson.module.css";

import ContentAttached from "./contentAttach";
import Comment from "./comment";

export default function Lesson({ lesson }) {
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
      <Paper elevation={3} className={lessonStyle.container}>
        <Grid container spacing={2}>
          <Grid item container xs={12}>
            <Grid item xs={1}>
              <Image
                src="/images/teacher.jpg" // Route of the image file
                height={50} // Desired size with correct aspect ratio
                width={50} // Desired size with correct aspect ratio
                alt="Avatar"
                className={lessonStyle.image}
              />
            </Grid>
            <Grid item xs={10}>
              <p className={lessonStyle.teacherName}>{lesson.personPost}</p>
            </Grid>
            <Grid item xs={1}>
              <Button>
                <MoreVertIcon></MoreVertIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            Gửi các bạn nội dung buổi trình bày của FOSSIL thứ 5 tuần này, các
            bạn có những thắc mắc hay yêu cầu gì thì nhắn lại để thầy nhắn với
            bên phía FOSSIL nhé: Chủ đề: mở rộng hệ thống từ 0 đến hàng triệu
            người dùng Từng bước thay đổi thiết kế hệ thống dựa vào nhu cầu tăng
            lên của người dùng Trực tiếp chia sẻ cách triển khai hệ thống (demo)
            Chia sẻ con đường thực tế đã trải qua của Thảo và Khôi Chia sẻ những
            kiến thức cần thiết cho kỹ sư Backend và DevOps, cấu trúc phỏng vấn
            thực tế
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <ContentAttached></ContentAttached>
            </Grid>
            <Grid item xs={6}>
              <ContentAttached></ContentAttached>
            </Grid>
            <Grid item xs={6}>
              <ContentAttached></ContentAttached>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Comment></Comment>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
