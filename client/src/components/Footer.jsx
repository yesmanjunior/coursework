import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categories/.NET">.NET</Link></li>
        <li><Link to="/posts/categories/Rust">Rust</Link></li>
        <li><Link to="/posts/categories/Java">Java</Link></li>
        <li><Link to="/posts/categories/Python">Python</Link></li>
        <li><Link to="/posts/categories/JavaScript">JavaScript</Link></li>
        <li><Link to="/posts/categories/Go">Go</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>Nerdy Coders Blog Community &copy; Made by saneq</small>
      </div>
    </footer>
  );
};

export default Footer;
