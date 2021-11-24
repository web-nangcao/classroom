import { useState, useEffect } from "react";

function Expire(props) {
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

export default Expire;
