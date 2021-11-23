import { useState, useEffect, useLayoutEffect } from "react";

export default function Session({
  userInfo,
  detailClassInfo,
  accessTokenInfo,
  countInfor,
}) {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState({});
  const [detailClass, setdetailClass] = useState({});
  const [accessToken, setAccessToken] = useState("");

  useLayoutEffect(() => {
    if (userInfo !== undefined) {
      sessionStorage.setItem("user", userInfo);
      setUser(userInfo);
    } else {
      if (sessionStorage.getItem("user")) {
        setCount(sessionStorage.getItem("user"));
      } else {
        sessionStorage.setItem("user", user);
      }
    }
    if (detailClassInfo !== undefined) {
      sessionStorage.setItem("detailClass", detailClassInfo);
      setUser(detailClassInfo);
    } else {
      if (sessionStorage.getItem("detailClass")) {
        setCount(sessionStorage.getItem("detailClass"));
      } else {
        sessionStorage.setItem("detailClass", detailClass);
      }
    }
    if (accessTokenInfo !== undefined) {
      sessionStorage.setItem("accessToken", accessTokenInfo);
      setUser(accessTokenInfo);
    } else {
      if (sessionStorage.getItem("accessToken")) {
        setCount(sessionStorage.getItem("accessToken"));
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }
    }
    if (countInfor !== undefined) {
      console.log(countInfor);
      sessionStorage.setItem("count", countInfor);
      setCount(countInfor);
    } else {
      if (sessionStorage.getItem("count")) {
        setCount(parseInt(sessionStorage.getItem("count")));
      } else {
        sessionStorage.setItem("count", count);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("count", count);
  }, [count, user, detailClass, accessToken]);

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}
