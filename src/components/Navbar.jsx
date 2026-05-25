import { useState } from "react";
import I from "./Icon";
import LOGO_IMG from "../constants/logo";
import { ACC, DARK } from "../constants/colors";

function Navbar({ go, page, mobileMenu, setMobileMenu }) {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const next = clickCount + 1;
    if (next >= 3) { go("admin"); setClickCount(0); }
    else { go("home"); setClickCount(next); setTimeout(() => setClickCount(0), 800); }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={handleLogoClick}>
          <img src={LOGO_IMG} alt="Hikes &amp; Miles Tourism" style={{ height:80, width:"auto", objectFit:"contain", filter:"none" }} />
        </div>
        <div className="nav-links">
          {[["home","Home"],["destinations","Destinations"],["packages","Packages"],["custom-package","✨ Custom Trip"],["blog","Blog"]].map(([v,l]) => (
            <span key={v} className={`nav-link${page===v?" act":""}`} onClick={() => go(v)} style={v==="custom-package"?{color:ACC,fontWeight:700}:{}}>{l}</span>
          ))}
          <button className="nav-cta" onClick={() => go("booking")}>Book Now</button>
        </div>
        <button className="mob-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          <I n={mobileMenu?"close":"menu"} s={22} c="#fff" />
        </button>
      </nav>
      {mobileMenu && (
        <div style={{ position:"fixed",top:68,left:0,right:0,background:"rgba(255,255,255,0.98)",zIndex:199,padding:"1rem",display:"flex",flexDirection:"column",gap:4,borderBottom:`2px solid rgba(212,80,10,0.15)`,boxShadow:"0 8px 24px rgba(0,0,0,0.1)" }}>
          {[["home","Home"],["destinations","Destinations"],["packages","Packages"],["blog","Blog"]].map(([v,l]) => (
            <span key={v} className="nav-link" style={{ padding:"12px 1rem",display:"block",borderRadius:8,color:DARK }} onClick={() => go(v)}>{l}</span>
          ))}
          <button className="nav-cta" style={{ marginTop:8,width:"100%" }} onClick={() => go("booking")}>Book Now</button>
        </div>
      )}
    </>
  );
}

export default Navbar;
