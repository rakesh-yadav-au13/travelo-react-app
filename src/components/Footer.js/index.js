import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="sozial d-flex align-items-center justify-content-center ">
        <ul>
          <li>
            <img
              className="logo"
              src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_facebook-128.png"
              alt="fb_logo"
            />
          </li>
          <li>
            <img
              className="logo"
              src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/twitter_online_social_media-128.png"
              alt="twiter_logo"
            />
          </li>
          <li>
            <img
              className="logo"
              src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/instagram_online_social_media_photo-128.png"
              alt="instagram_logo"
            />
          </li>
          <li>
            <img
              className="logo"
              src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_google_plus-128.png"
              alt="google_logo"
            />
          </li>
        </ul>
      </div>

      <div className="copyright">
        <p>Travelo &copy; : 2021 </p>
      </div>
    </footer>
  );
};

export default Footer;
