import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import lessonStyle from "./lesson.module.css";

export default function Comment() {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
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
        <form>
          <Grid container>
            <Grid item xs={11.5}>
              <Controller
                name={"textValue"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextField
                      id="outlined-required"
                      label="Add your comment:"
                      defaultValue=""
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={0.5}>
              <Button onClick={handleSubmit(onSubmit)}>Send</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
