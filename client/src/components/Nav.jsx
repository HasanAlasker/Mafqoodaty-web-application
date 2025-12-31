import logo from "../assets/wLogo.png";
import { Route, useLocation } from "react-router-dom";

function Nav({ onMenuOpen }) {
  const location = useLocation()
  const active = location.pathname;
  console.log("path: ",active);

  return (
    <nav>
      <div className="nav-cont">
        <div className="links">
          <a href="/home" className={active === "/home" ? "active" : ""}>
            الرئيسة
          </a>
          <a href="/addPost" className={active === "/addPost" ? "active" : ""}>
            إضافة منشور
          </a>
        </div>
        <a href="/" className="logo">
          <img src={logo} alt="logo"></img>
        </a>
        {/* <span className="material-symbols-outlined menu" onClick={onMenuOpen}>
          dehaze
        </span> */}
      </div>
    </nav>
  );
}

export default Nav;
