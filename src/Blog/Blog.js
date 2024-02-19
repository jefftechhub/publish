import React, { useEffect, useState } from "react";
import "./Blog.css";
import { getTime } from "../getTime";
import { useParams } from "react-router-dom";

import { useAxios } from "../useAxios";

const BlogPage = () => {
  const { url } = useParams();
  const [blog, setBlog] = useState({});
  const urlBlog = `/api/blog/${url}`;

  const { loading, error, data, errMssg } = useAxios(urlBlog);

  useEffect(() => {
    if (data) {
      setBlog(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loading">
        <h3>loading...</h3>
      </div>
    );
  } else if (error) {
    return (
      <div className="error-blog-container">
        <h3>{errMssg}</h3>
      </div>
    );
  } else {
    return (
      <div className="content">
        <main>
          <Blog {...blog} />
        </main>
      </div>
    );
  }
};

const Blog = (props) => {
  const { description, datePosted, blog } = props;
  const time = getTime(datePosted);

  return (
    <div className="blog">
      <h1>{description && description}</h1>
      {datePosted && <p id="time">By geoffrey odede | {time}</p>}
      {blog && <div dangerouslySetInnerHTML={{ __html: blog }} />}
    </div>
  );
};

// const ReadAlso = ({ newData }) => {
//   return (
//     <div className="readAlso">
//       <h1>
//         read also <i class="fa-solid fa-forward"></i>
//       </h1>
//       <div>
//         {newData.map((item, index) => {
//           return (
//             <div key={index} className="readAlsoItem">
//               <h1>{index + 1}</h1>
//               <h2>{item.description}</h2>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default BlogPage;
