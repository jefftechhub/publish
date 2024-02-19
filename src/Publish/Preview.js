import React from "react";
import "../Blog/Blog.css";

function Preview(props) {
  const { description, blog } = props;

  return (
    <div className="blog">
      <h1>{description}</h1>
      <p id="time">By geoffrey odede </p>

      {blog && <div dangerouslySetInnerHTML={{ __html: blog }} />}
    </div>
  );
}

export default Preview;
