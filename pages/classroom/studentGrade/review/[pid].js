import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid } from "@mui/material";
import Image from "next/dist/client/image";

import gradeStyle from "./[pid].module.css";
import Cookie from "js-cookie";

import axios from "axios";

import TopBarClassDetail from "../../../../components/topBarClassDetail/topBarClassDetail";

const axiosApiCall = (url, method, headers = {}, data) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: data,
    headers: headers,
  });

function createData(name, code, population, size) {
  const density = population;
  return { name, code, population, size, density };
}

const data = [
  {
    name: "Cuối kỳ",
    rate: 10,
    point: 100,
  },
  {
    name: "Giữa kỳ",
    rate: 5,
    point: 80,
  },
  {
    name: "Seminar",
    rate: 5,
    point: 90,
  },
  {
    name: "Bài tập về nhà",
    rate: 4,
    point: 80,
  },
  {
    name: "Bài tập tại lớp",
    rate: 4,
    point: 100,
  },
];

export default function StickyHeadTable() {
  const router = useRouter();
  const { pid } = router.query;
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
    const access_token = "Bearer " + Cookie.get("accesstoken");
    const headers = { authorization: access_token };
    axiosApiCall(
      `classroom-grade/download-student-list-template/61bca5ded81f63a8b22568d8`,
      "get",
      headers,
      []
    )
      .then((res) => {
        console.log("classroom-grade/download-student-list-template");
        console.log(res.data.resValue);
      })
      .catch(function (error) {
        console.log("lỗi rồi nè má");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRow] = useState([]);
  const [columns, setColumn] = useState([]);
  const [overal, setOveral] = useState(0);

  useEffect(() => {
    if (!Cookie.get("accesstoken")) {
      Cookie.set("prePath", `/classroom/detail/${pid}`);
      router.push("/login");
    }
    if (!pid) {
      return;
    }

    let Col = Object.keys(data[0]);
    //Col.push("Tong ket");
    setColumn(Col);
    setRow(data);

    let sumPoint = 0;
    let sumRate = 0;
    data.forEach((assignment) => {
      sumPoint += parseInt(assignment.point) * parseInt(assignment.rate);
      sumRate += parseInt(assignment.rate);
    });
    setOveral(parseInt(sumPoint / sumRate));
  }, [pid]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, pos) => {
    console.log(event.currentTarget.value);
    console.log(pos);

    const position = pos.search("_");
    const row = pos.substring(0, position);
    const col = pos.substring(position + 1);
    console.log(row);
    console.log(col);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <TopBarClassDetail></TopBarClassDetail>
      <div className={gradeStyle.container}>
        <Paper
          sx={{ width: "70%", overflow: "hidden", justifyContent: "center" }}
        >
          <form>
            <Controller
              name={"textValue"}
              control={control}
              render={({ field: { onChange, value } }) => <></>}
            />
            <p>Dương Bội Long</p>
            <p>MSSV</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Loại điểm</TableCell>
                    <TableCell>Tỉ lệ điểm</TableCell>
                    <TableCell align="right">Điểm</TableCell>
                    <TableCell align="right">Phúc khảo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.rate}</TableCell>
                      <TableCell align="right">{row.point}</TableCell>

                      <TableCell align="right">
                        <IconButton color="primary" aria-label="Phúc khảo">
                          <HelpOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow>
                  <TableCell>Tổng kết</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">{overal}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </form>
          <Grid item container xs={12}>
            <Grid item xs={1}>
              <Image
                src="/images/teacher.jpg" // Route of the image file
                height={50} // Desired size with correct aspect ratio
                width={50} // Desired size with correct aspect ratio
                alt="Avatar"
                className={gradeStyle.image}
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
        </Paper>
      </div>
    </>
  );
}
