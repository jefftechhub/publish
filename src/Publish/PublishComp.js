import React from "react";
import "./Publish.css";

import QuillEditor from "./QuillEditor";

function PublishComp(props) {
  const {
    blog,
    setBlog,
    content,
    setShowPreview,
    value,
    changeHandler,
    setResMssg,
    setShowMssg,
  } = props;

  return (
    <div className="content-publish">
      <h1>publish my blog</h1>
      <form>
        <label for="category">category</label>
        <select
          id="category"
          name="category"
          value={content.category}
          onChange={changeHandler}
        >
          <option value="news">News</option>
          <option value="finance">finance</option>
          <option value="trends">trends</option>
        </select>
        <label for="textArea">description</label>
        <textarea
          id="textArea"
          onChange={changeHandler}
          name="description"
          value={content.description}
          placeholder="Describe your blog..."
        ></textarea>
        <label for="url">short URL</label>
        <input
          id="url"
          type="text"
          onChange={changeHandler}
          name="url"
          value={content.url}
          placeholder="write a short url description..."
        />
        <QuillEditor blog={blog} setBlog={setBlog} />
        <button
          className="btnSubmit"
          type="button"
          onClick={() => {
            if (
              value.url &&
              value.blog &&
              value.description &&
              value.category
            ) {
              setShowPreview(true);
            } else {
              setResMssg("All fields are required");
              setShowMssg(true);
            }
          }}
        >
          preview
        </button>
      </form>
    </div>
  );
}

export default PublishComp;
