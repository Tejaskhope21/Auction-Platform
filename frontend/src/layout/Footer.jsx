import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <Link to="/" className="social-icon facebook">
          <FaFacebook />
        </Link>
        <Link to="/" className="social-icon instagram">
          <FaInstagram />
        </Link>
      </div>

      <Link to="/contact" className="footer-link">
        Contact Us
      </Link>
      <p className="footer-text">&copy; PrimeBid, LLC.</p>
      <p className="footer-text">
        Designed By{" "}
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
