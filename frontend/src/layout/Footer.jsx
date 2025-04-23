import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaLink } from "react-icons/fa";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <Link
          to="https://www.linkedin.com/in/tejas-khope-7124a2287/"
          className="social-icon facebook"
        >
          <FaLinkedin />
        </Link>
        <Link
          to="https://tejasportfolioaboutme.netlify.app/"
          className="social-icon instagram"
        >
          <FaLink />
        </Link>
      </div>

      <Link to="/contact" className="footer-link">
        Contact Us
      </Link>
      <p className="footer-text">&copy; MyBid</p>
      <p className="footer-text">
        Developed By{" "}
        <Link to="/" className="footer-designer">
          TEJASKHOPE
        </Link>
      </p>

      <ul className="footer-links">
        <li>
          <Link to="/how-it-works-info" className="footer-item">
            <SiGooglesearchconsole /> How it works
          </Link>
        </li>
        <li>
          <Link to="/about" className="footer-item">
            <BsFillInfoSquareFill /> About Us
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
