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
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import addPeopleStyle from "./addPeople.module.css";

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
      <DialogTitle>Thêm thành viên mới</DialogTitle>
      <FormWithHookForm
        handleAddPeolple={props.handleAddPeolple}
      ></FormWithHookForm>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddPeopleDialog({ handleAddPeolple }) {
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
      <Button onClick={handleClickOpen}>Thêm thành viên</Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleAddPeolple={handleAddPeolple}
      />
    </div>
  );
}

export const FormWithHookForm = ({ handleAddPeolple }) => {
  const [type, setType] = React.useState("");
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
    if (data.txtEmail !== "" && data.txtUserType !== "") {
      handleAddPeolple(data);
    }
    //
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const options = [
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" },
  ];

  return (
    <form className={addPeopleStyle.container}>
      <Controller
        name={"textValue"}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <TextField
              required
              id="outlined-required"
              label="Email:"
              defaultValue=""
              {...register("txtEmail")}
              onChange={onChange}
              className={addPeopleStyle.textField}
            />
            <br></br>
            <Select
              className="usetType"
              fullWidth
              id="followers"
              labelId="followersL"
              margin="dense"
              displayEmpty
              name="followers"
              onChange={handleChange}
              value={value}
              variant="outlined"
              {...register("txtUserType")}
            >
              {options.map((element) => (
                <MenuItem value={element.value} key={Object.keys(element)[0]}>
                  {element.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />

      <Button onClick={handleSubmit(onSubmit)}>Mời tham gia</Button>
    </form>
  );
};
