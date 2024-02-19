import React, { useEffect, useState } from "react";
import PublishComp from "./PublishComp";
import Preview from "./Preview";
import axios from "axios";

function Publish() {
  const [content, setContent] = useState({
    description: "",
    url: "",
    category: "",
  });
  const [blog, setBlog] = useState("");
  const [value, setValue] = useState({ blog, ...content });
  const [showPreview, setShowPreview] = useState(false);
  const [resMssg, setResMssg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMssg, setShowMssg] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValue({ blog, ...content });
  }, [blog, content]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContent({ ...content, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const image = document.querySelectorAll(".inner-preview img")[0];
    const imageCover = image.getAttribute("src");
    const blogDetails = { imageCover, ...value };

    try {
      if (value.blog && value.description && value.url) {
        setLoading(true);
        axios
          .post("/publish", blogDetails, {
            "Content-Type": "application/json",
          })
          .then((res) => {
            if (res.data.success) {
              setResMssg(res.data.message);
              setBlog("");

              setContent({
                description: "",
                url: "",
                category: "",
              });

              setLoading(false);
              setShowMssg(true);
              setShowPreview(false);
            }
          })
          .catch((err) => {
            setResMssg(err);
            setLoading(false);
            setShowMssg(true);
          });
      } else {
        setResMssg("All fields are required");
        setShowMssg(true);
      }
    } catch (error) {
      setResMssg("Something went wrong");
      setLoading(false);
      setError(true);
    }
  };

  if (error) {
    return (
      <div>
        <h3>{error}</h3>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        {showMssg && <ResMssg resMssg={resMssg} />}

        <PublishComp
          setShowPreview={setShowPreview}
          value={value}
          changeHandler={changeHandler}
          content={content}
          setBlog={setBlog}
          blog={blog}
          setResMssg={setResMssg}
          setShowMssg={setShowMssg}
        />

        {showPreview && (
          <div className="preview">
            <div className="inner-preview">
              <h1 id="previewHeading">preview your blog</h1>
              <Preview {...value} />
              <div className="btn-container">
                <button type="button" onClick={submitHandler}>
                  {loading ? "loading.. " : "submit"}
                </button>

                {!loading && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowPreview(false);
                    }}
                  >
                    cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const ResMssg = ({ resMssg }) => {
  return (
    <div className="resMssg">
      <p>{resMssg}</p>
    </div>
  );
};

export default Publish;
