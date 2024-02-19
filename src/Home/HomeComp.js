import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { getTime } from "../getTime";

export const HomeComp = (props) => {
  const { blogs } = props;

  const article = blogs[blogs.length - 1];

  //banner
  return (
    <main>
      <Banner {...article} blogs={blogs} />
      <SecondDisplay blogs={blogs} />
      <MostRead blogs={blogs} />
    </main>
  );
};

// banner
const Banner = (props) => {
  const { category, description, imageCover, url, datePosted } = props;

  const time = getTime(datePosted);

  return (
    <div className="containerBanner">
      <div className="banner">
        <h2>{category && category}</h2>
        <h3>{description && description}</h3>
        {datePosted && (
          <p className="time">
            <i class="fa-regular fa-clock"></i> {time}
          </p>
        )}
        {imageCover && (
          <div className="image">
            <img src={imageCover}></img>
          </div>
        )}

        <Link to={`/blog/${url}`}>
          <button type="button">read more</button>
        </Link>
      </div>
      {/* {blogs.length > 0 && (
        <div className="displayColumn">
          <h2 id="inBriefHeading">
            In brief <i class="fa-solid fa-forward"></i>
          </h2>
          <DisplayComp blogs={blogs} />
        </div>
      )} */}
    </div>
  );
};

//in brief
const DisplayComp = ({ blogs }) => {
  const briefItem = blogs.length > 0 && blogs.slice(0, 6);

  return (
    <>
      {briefItem.lenghth > 0 && (
        <div className="display">
          {briefItem.map((item, index) => {
            return (
              <div className="displayItem" key={index}>
                <img src={item.imageCover} />
                <div className="details">
                  <h4>{item.description}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

//latest component
const SecondDisplay = ({ blogs }) => {
  const latest = blogs.length > 0 && blogs.slice(0, 9);

  return (
    <div>
      {latest.length > 0 && (
        <div>
          <h1 id="heading">
            Latest
            <i class="fa-solid fa-forward"></i>
          </h1>
          <div className="secondDisplay">
            {latest.map((item, index) => {
              return <LatestComp {...item} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const LatestComp = (props) => {
  const { datePosted, imageCover, url, category, description } = props;
  const time = getTime(datePosted);

  return (
    <Link to={`/blog/${url}`}>
      <div className="singleSecondDisplay">
        {imageCover && (
          <div className="singleImage">
            <img src={imageCover}></img>
            <p>
              <i class="fa-regular fa-clock"></i> {time}
            </p>
          </div>
        )}

        <div className="wrapper">
          <h1>{category}</h1>
          <h2>{description}</h2>
        </div>
      </div>
    </Link>
  );
};

const MostRead = ({ blogs }) => {
  const mostRead = blogs
    .slice()
    .sort((a, b) => a.url.localeCompare(b.category));
  const tenMostRead = mostRead.slice(0, 10);

  return (
    <>
      {blogs.length > 0 && (
        <div>
          <h1 id="mstReadHeading">
            Most Read <i class="fa-solid fa-forward"></i>
          </h1>
          <div className="mostRead">
            {tenMostRead.map((item, index) => {
              return <MostReadComp index={index} key={index} {...item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

const MostReadComp = ({ description, url }) => {
  return (
    <Link to={`/blog/${url}`}>
      <div className="mostReadComp">
        <h2>{description}</h2>
      </div>
    </Link>
  );
};
