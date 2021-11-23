import * as React from "react";

import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";


const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    data: body,
  });

export default function Logout() {
  const router = useRouter();

  const handleLogin = () => {

    const access_token = Cookie.get("accesstoken");

    axiosApiCall("auth/logout", "post", { access_token }).then((res) => {
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    
    // remove accessToken
    Cookie.set("accesstoken", null);
    Cookie.set("user", null);
    router.push("/login");
  };

  return (
    <Button onClick={handleLogin} variant="outlined" startIcon={<LogoutIcon />}>
    </Button>
  );
}
