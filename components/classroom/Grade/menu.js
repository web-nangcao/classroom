import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function MenuList({
  id,
  mark_assignment_finallized,
  exportFile_SpecGrade,
  importFile_SpecGrade,
  classStyle,
  is_finallized,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <span className={classStyle}>
      <Button
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id={`actions-${id}`}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            mark_assignment_finallized(id, is_finallized);
          }}
        >
          {is_finallized ? "Không công khai điểm" : "Công bố điểm"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            exportFile_SpecGrade(id);
          }}
        >
          Export file
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            importFile_SpecGrade(id);
          }}
        >
          Import file
        </MenuItem>
      </Menu>
    </span>
  );
}
