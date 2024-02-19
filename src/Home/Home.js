import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { HomeComp } from "./HomeComp";
import { useAxios } from "../useAxios";

const Home = () => {
  const single = useRef(null);
  const parentSingle = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const urlBlogs = "/blogs";

  const { loading, data, error, errMssg } = useAxios(urlBlogs);

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loading">
        <h3>loading...</h3>
      </div>
    );
  } else if (error) {
    <h3>{errMssg}</h3>;
  } else {
    return (
      <HomeComp single={single} parentSingle={parentSingle} blogs={blogs} />
    );
  }
};

export default Home;
