import React from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Link,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookie from "js-cookie";
import config from "../../next.config";
import Box from '@mui/material/Box';
const axiosApiCall = (url, method, body = {}) =>
    axios({
        method,
        // url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
        // test
        url: `http://localhost:3000/api/forgotpassword`,
        data: body,
    });

export default function ForgotPassword() {

    const [errors, setErrors] = useState({
        email: "",
    });

    const [forms, setForms] = useState({
        email: "",
    });

    const [success, setSuccess] = useState("");


    const router = useRouter();

    const access_token = Cookie.get("accesstoken");

    if (access_token !== undefined) {
        router.push("/");
    }

    const handleLogin = () => {
        router.push("/login");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        let email_forgot = data.get('email');

        let check = validate(data.get('email'));

        if (check === true) {
            axiosApiCall("auth/google-token", "post", { email_forgot })
                .then((res) => {
                    let data = res.data;
                    if (data.success) {
                        setSuccess("success");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        }


    };

    const validate = (v_email) => {

        let error_email = "";

        if (!(/$^|.+@.+..+/).test(v_email) || v_email == "") {
            error_email = "Wrong email format"
        }

        setErrors({
            email: error_email,
        })

        if (error_email != "") {
            return false;
        } else {
            return true;
        }

    }

    const handleRegister = function () {

        axiosApiCall("auth/google-token", "post", { access_token })
            .then((res) => {

                if (res.success) {
                    console.log("hi");
                    Cookie.set("user", JSON.stringify(res.data.user));
                    Cookie.set("accesstoken", res.data.access_token);

                    console.log(res.data.access_token);

                    console.log("prepath: " + Cookie.get("prePath"));
                    Cookie.get("prePath")
                        ? router.push(Cookie.get("prePath"))
                        : router.push("/");
                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const paperStyle = {
        padding: 20,
        width: 350,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>{" "}
                    <h2> Forgot Password </h2>{" "}
                </Grid>
                <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item >
                        New password will send to your email
                    </Grid>
                </Grid>
                <Grid align="center">
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            defaultValue={forms.email}
                            error={errors.email != ""}
                            helperText={errors.email != "" ? errors.email : ' '}
                        />
                        {success != "" &&
                            <Alert sx={{ mb: 2 }} severity="success">New password is sent to your email.</Alert>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            SUBMIT
                        </Button>

                    </Box>
                    <Grid item sx={{ mt: 2 }}>
                        <Link onClick={handleLogin} variant="body2">
                            Back to Login
                        </Link>
                    </Grid>
                </Grid>
            </Paper>{" "}
        </Grid>
    );
}
