import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Image from "next/image";
import Link from "next/link";

import ClassroomStyle from "./classroom.module.css";

export default function ClassRoom({ classroom }) {
  return (
    <Link href={`classroom/detail/${classroom._id}`}>
      <a>
        <Card
          sx={{ maxWidth: "380px" }}
          className={ClassroomStyle.cardClassroom}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image="/images/reactAva.jpg"
            className={ClassroomStyle.cardHeader}
          />
          <CardContent className={ClassroomStyle.cardContent}>
            <Typography gutterBottom variant="h5" component="div">
              {classroom.className}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Topic: {classroom.topic}
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={9} className={ClassroomStyle.personName}>
                <Typography variant="body2" color="text.secondary">
                  Host: {classroom.host}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Image
                  src="/images/teacher.jpg" // Route of the image file
                  height={70} // Desired size with correct aspect ratio
                  width={70} // Desired size with correct aspect ratio
                  alt="Avatar"
                  className={ClassroomStyle.image}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={ClassroomStyle.cardFooter}>
            <Button size="small">Open your Work</Button>
            <Button size="small">Open in new Tab</Button>
          </CardActions>
        </Card>
      </a>
    </Link>
  );
}
