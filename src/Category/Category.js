import React, { useEffect, useState } from "react";
import CategoryComp from "./CategoryComp";
import { useParams } from "react-router-dom";
import "./Category.css";
import { useAxios } from "../useAxios";

const Category = () => {
  const [blogs, setBlogs] = useState([]);
  const { btn } = useParams();

  const urlCategory = `/api/category/${btn}`;

  const { loading, data, error, errMssg } = useAxios(urlCategory);

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
    <h3>error fetching data</h3>;
  } else {
    return (
      <div>
        <CategoryComp blogs={blogs} category={btn} />
      </div>
    );
  }
};

export default Category;
