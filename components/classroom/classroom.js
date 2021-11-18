import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ClassroomStyle from "./classroom.module.css";

export default function ClassRoom() {
  return (
    <Card sx={{ maxWidth: 345 }} className={ClassroomStyle.cardClassroom}>
      <CardMedia
        component="img"
        alt="green iguana"
        image="/images/reactAva.jpg"
        className={ClassroomStyle.cardHeader}
      />
      <CardContent className={ClassroomStyle.cardContent}>
        <Typography gutterBottom variant="h5" component="div">
          Class Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discription of Clas
        </Typography>
      </CardContent>
      <CardActions className={ClassroomStyle.cardFooter}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
