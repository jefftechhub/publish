import React from "react";
import { getTime } from "../getTime";
import { Link } from "react-router-dom";

const CategoryComp = (props) => {
  const { blogs, category } = props;

  const images = blogs.map((blog) => blog.imageCover);
  const bannerImage = images[images.length - 1];

  return (
    <div>
      <div className="categoryBanner">
        <img src={bannerImage} />
        <h1>{category}</h1>
      </div>
      <main>
        <div className="latestContent">
          <h2 className="heading">
            latest on {category}
            <i class="fa-solid fa-forward"></i>
          </h2>
          <div className="latestcategory">
            {blogs.map((blog) => (
              <LatestCategory {...blog} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="heading">
            more on {category} <i class="fa-solid fa-forward"></i>
          </h2>
          <div className="moreCategory">
            {blogs.map((blog) => (
              <MoreCategory {...blog} category={category} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const LatestCategory = ({ imageCover, datePosted, description, url }) => {
  const postedDate = getTime(datePosted);

  return (
    <Link to={`/blog/${url}`}>
      <div className="latestCategoryItem">
        {imageCover && <img src={imageCover} />}
        <div className="description">
          <h5>{postedDate}</h5>
          <h3>{description}</h3>
        </div>
      </div>
    </Link>
  );
};

const MoreCategory = ({ imageCover, datePosted, description, url }) => {
  const postedDate = getTime(datePosted);

  return (
    <Link to={`/blog/${url}`}>
      <div className="moreCategoryItems">
        {imageCover && <img src={imageCover} />}
        <div>
          <h2>{postedDate}</h2>
          <h3>{description}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryComp;
