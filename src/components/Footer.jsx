import I from "./Icon";
import LOGO_IMG from "../constants/logo";
import { SAFFRON } from "../constants/colors";

const COMPANY_LINKS = [
  ["About Us",       "about"],
  ["Our Guides",     "guides"],
  ["Safety Policy",  "safety"],
  ["Group Bookings", "group-bookings"],
  ["Careers",        "careers"],
];

const SOCIALS = ["instagram","facebook","twitter","youtube","whatsapp"];

function Footer({ go, data }) {
  return (
    <footer className="footer">
      <div className="india-flag-strip" />
      <div className="footer-inner" style={{ paddingTop:"3rem" }}>
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <img src={LOGO_IMG} alt="Hikes &amp; Miles Tourism" style={{ height:80, width:"auto", objectFit:"contain", filter:"none", marginBottom:4 }} />
            </div>
            <p className="footer-desc">{data.brand.tagline}. Crafting authentic Indian journeys — from sacred ghats to tiger-filled jungles — with care, expertise, and heart.</p>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a
                  key={s}
                  href={data.brand.socials?.[s] ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="soc-btn"
                  aria-label={s}
                >
                  <I n={s} s={15} c="#fff" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-h">Packages</div>
            {["Char Dham Yatra","Tiger Safaris","Himalayan Treks","Heritage Tours","Backwater Escapes"].map(l => (
              <button key={l} className="footer-link" onClick={() => go("packages")}>{l}</button>
            ))}
          </div>

          <div>
            <div className="footer-col-h">Company</div>
            {COMPANY_LINKS.map(([label, page]) => (
              <button key={label} className="footer-link" onClick={() => go(page)}>{label}</button>
            ))}
          </div>

          <div>
            <div className="footer-col-h">Contact Us</div>
            <div className="footer-contact-item"><I n="phone" s={14} c={SAFFRON} /><span style={{color:SAFFRON}}>{data.brand.phone}</span></div>
            <div className="footer-contact-item"><I n="whatsapp" s={14} c="#25D366" /><span style={{color:"#25D366"}}>WhatsApp: {data.brand.whatsapp}</span></div>
            <div className="footer-contact-item"><I n="send" s={14} c="rgba(255,255,255,0.5)" /><span>{data.brand.email}</span></div>
            <div className="footer-contact-item"><I n="map" s={14} c="rgba(255,255,255,0.5)" /><span>{data.brand.address}</span></div>
            <button className="btn btn-primary btn-sm" style={{ marginTop:"1rem" }} onClick={() => go("booking")}>Enquire Now</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Hikes &amp; Miles. All rights reserved. | India's own travel company 🇮🇳</span>
          <div style={{ display:"flex",gap:"1.5rem" }}>
            {["Privacy Policy","Terms","Refund Policy"].map(l => <span key={l} className="footer-link">{l}</span>)}
          </div>
        </div>

        <div style={{ textAlign:"center",paddingTop:"1rem",fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:"0.5rem" }}>
          Designed &amp; Developed by{" "}
          <a
            href="https://rangu-mallikarjun.netlify.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color:SAFFRON, fontWeight:700, textDecoration:"none", borderBottom:`1px solid rgba(247,148,29,0.5)`, paddingBottom:1 }}
            onMouseEnter={e=>{e.currentTarget.style.color="#fff"; e.currentTarget.style.borderBottomColor="rgba(255,255,255,0.5)";}}
            onMouseLeave={e=>{e.currentTarget.style.color=SAFFRON; e.currentTarget.style.borderBottomColor="rgba(247,148,29,0.5)";}}
          >
            Mallikarjun Rangu
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
