import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookie from "js-cookie";
import config from "../../next.config";

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: body,
  });

export default function Login() {
  const router = useRouter();

  const access_token = Cookie.get("accesstoken");
  console.log("access token ", access_token);
  console.log("env - test" , config.env.GOOGLE_CLIENT_ID);
  if (access_token !== undefined) {
    router.push("/");
  }

  const handleLogin = (response) => {
    const access_token = response.accessToken;

    console.log(response);

    console.log("hello");

    axiosApiCall("auth/google-token", "post", { access_token })
      .then((res) => {
        console.log("hi");
        Cookie.set("user", JSON.stringify(res.data.user));
        Cookie.set("accesstoken", res.data.access_token);

        console.log("prepath: " + Cookie.get("prePath"));
        Cookie.get("prePath")
          ? router.push(Cookie.get("prePath"))
          : router.push("/");
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
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>{" "}
          <h2> Sign In </h2>{" "}
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <GoogleLogin
          clientId={config.env.GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />{" "}
      </Paper>{" "}
    </Grid>
  );
}
