import { useState, useEffect } from "react";

export default  function Expire(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimer(props.delay);
  }, []);

  const setTimer = (delay) => {
    setTimeout(() => setIsVisible(false), delay);
  };

  if (!isVisible) {
    return null;
  }

  return isVisible ? <div>{props.children}</div> : <span />;
}

