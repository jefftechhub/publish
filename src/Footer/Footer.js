import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <h3>About</h3>
        <Link to={"./footer/about us"}>about us</Link>
        <Link to={"./footer/termsCondition"}>terms and conditions</Link>
        <Link to={"./footer/privacy"}>privacy and policies</Link>
      </div>
      <div>
        <h3>connect</h3>
        <Link to={"./footer/contactPage"}>contact us</Link>
        <Link to={"./footer/advert"}>advertise with us</Link>
        <Link to={"./publish"}>are you a publisher?</Link>
        <Link to={"./footer/tip"}>submit a tip</Link>
      </div>
      <div>
        <h3>follow us</h3>
        <a href="http://www.facebook.com" target="_blank">
          <p>
            <i class="fa-brands fa-facebook"></i> facebook
          </p>
        </a>
        <a href="http://www.twitter.com" target="_blank">
          <p>
            <i class="fa-brands fa-square-x-twitter"></i> twitter
          </p>
        </a>
        <a href="http://www.instagram.com" target="_blank">
          <p>
            <i class="fa-brands fa-square-instagram"></i> instagram
          </p>
        </a>
        <a href="http://www.linkedin.com" target="_blank">
          <p>
            <i class="fa-brands fa-linkedin"></i> linkedin
          </p>
        </a>
      </div>
    </div>
  );
};

export default Footer;
