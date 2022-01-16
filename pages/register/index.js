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
        url: `http://localhost:3000/api/register`,
        data: body,
    });

export default function Register() {

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const [forms, setForms] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const access_token = Cookie.get("accesstoken");
    console.log("access token ", access_token);
    console.log("env - test", config.env.GOOGLE_CLIENT_ID);
    if (access_token !== undefined) {
        router.push("/");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        let check = validate(data.get('email'), data.get('name'), data.get('password'), data.get('re-password'));

        if (check === true) {
            axiosApiCall("auth/google-token", "post", { access_token })
                .then((res) => {
                    let data = res.data;
                    if (data.success) {
                        setSuccess("123")
                        setError("")
                    }

                    if (data.error) {
                        setError("123")
                        setSuccess("")
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

    const validate = (v_email, v_name, v_password, v_repassword) => {

        let error_email = "";
        let error_name = "";
        let error_password = "";
        let error_repassword = "";



        if (!(/$^|.+@.+..+/).test(v_email) || v_email == "") {
            error_email = "Wrong email format"
        }
        if (v_name.length < 6 || v_name.length > 10) {
            error_name = "Name should be 6 to 10 characters.";
        }
        if (v_password.length < 6 || v_password.length > 10) {
            error_password = "Name should be 6 to 10 characters."
        }
        if (v_password != v_repassword) {
            error_repassword = "Password and rePassword are not same."
        }



        setErrors({
            name: error_name,
            email: error_email,
            password: error_password,
            rePassword: error_repassword,
        })

        if (error_email != "" || error_name != "" || error_password != "" || error_repassword != "") {
            return false;
        } else {
            return true;
        }

    }

    const handleLogin = function () {
        router.push("/login");
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
                    <h2> Register </h2>{" "}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            defaultValue={forms.password}
                            error={errors.password != ""}
                            helperText={errors.password != "" ? errors.password : ' '}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="re-password"
                            label="re-Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            defaultValue={forms.rePassword}
                            error={errors.rePassword != ""}
                            helperText={errors.rePassword != "" ? errors.rePassword : ' '}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            defaultValue={forms.name}
                            error={errors.name != ""}
                            helperText={errors.name != "" ? errors.name : ' '}
                        />
                        {success != "" &&
                            <Alert sx={{ mb: 2 }} severity="success">Your account is registered.</Alert>
                        }
                        {error != "" &&
                            <Alert sx={{ mb: 2 }} severity="error">Email is already taken.</Alert>
                        }

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            REGISTER
                        </Button>

                    </Box>

                </Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item >
                        <Link onClick={handleLogin} variant="body2">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Paper>{" "}
        </Grid>
    );
}
