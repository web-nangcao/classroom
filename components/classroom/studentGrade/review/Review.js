import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import reviewStyle from "./Review.module.css";

import axios from "axios";

const axiosApiCall = (url, method, headers = {}) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: {},
    headers: headers,
  });

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>NỘI DUNG PHÚC KHẢO</DialogTitle>
      <FormWithHookForm
        submitReview={props.submitReview}
        onClose={onClose}
      ></FormWithHookForm>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ReviewPopUp({ submitReview }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("emails[1]");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained">
        Click vào đây để phúc khảo
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        submitReview={submitReview}
      />
    </div>
  );
}

export const FormWithHookForm = ({ submitReview, onClose }) => {
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    onClose();
    submitReview(data);
  };

  return (
    <form className={reviewStyle.container}>
      <Controller
        name={"textValue"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextField
              required
              id="outlined-required"
              label="Điểm mong muốn: "
              defaultValue=""
              {...register("txtGrade")}
              onChange={onChange}
              className={reviewStyle.textField}
            />
            <br></br>
            <TextField
              required
              id="outlined-required"
              label="Lý do: "
              {...register("txtComment")}
              defaultValue=""
              onChange={onChange}
              multiline
              className={reviewStyle.textField}
            />
            <br></br>
          </>
        )}
      />
      <Button onClick={handleSubmit(onSubmit)} variant="contained">
        Gửi Đi
      </Button>
    </form>
  );
};
