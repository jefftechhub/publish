import React, { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errMssg, setErrMssg] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setErrMssg("internal server error");
          setLoading(false);
          setError(true);
        });
    } catch (error) {
      setErrMssg("Error Fetching Data");
      setLoading(false);
      setError(true);
    }
  }, []);

  return { loading, error, errMssg, data };
};
