import React, { useEffect } from "react";

const Home = ({ setBottomFlag }) => {
  useEffect(() => {
    setBottomFlag(false);
  }, []);
  return <div></div>;
};

export default Home;
