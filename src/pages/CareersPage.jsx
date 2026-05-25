import { useState } from "react";
import I from "../components/Icon";
import { ACC, DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

const OPENINGS = [
  {
    id: 1, title: "Trekking Guide – Himachal Pradesh", type: "Full-time", loc: "Manali / Spiti", dept: "Field Operations",
    desc: "Lead multi-day treks in Spiti Valley and surrounding areas. Must be NIMAS-certified with 3+ years of high-altitude experience.",
    skills: ["NIMAS/HMI Certification", "High-altitude first aid", "Hindi & English", "Navigation & Camping"],
  },
  {
    id: 2, title: "Wildlife Safari Naturalist", type: "Seasonal", loc: "Nagpur / Pench", dept: "Wildlife Division",
    desc: "Conduct wildlife safaris, bird-watching sessions, and nature walks for guests. Must have deep knowledge of Central Indian wildlife.",
    skills: ["Naturalist certification", "Wildlife photography basics", "English communication", "Jeep driving license"],
  },
  {
    id: 3, title: "Travel Sales Executive", type: "Full-time", loc: "Hyderabad (Remote OK)", dept: "Sales",
    desc: "Handle inbound enquiries, convert leads into bookings, and manage customer relationships through the travel lifecycle.",
    skills: ["Travel industry knowledge", "Excellent communication", "CRM proficiency", "Hindi & English fluency"],
  },
  {
    id: 4, title: "Digital Marketing Specialist", type: "Full-time", loc: "Hyderabad / Remote", dept: "Marketing",
    desc: "Drive organic growth through SEO, social media campaigns, influencer partnerships, and content strategy for Hikes & Miles.",
    skills: ["SEO & Google Ads", "Instagram & YouTube", "Content writing", "Analytics tools"],
  },
  {
    id: 5, title: "Operations Coordinator", type: "Full-time", loc: "Hyderabad", dept: "Operations",
    desc: "Coordinate day-to-day travel logistics — hotel bookings, vehicle scheduling, guide assignments, and customer communication.",
    skills: ["Excel / Google Sheets", "Vendor coordination", "Attention to detail", "Travel industry experience"],
  },
  {
    id: 6, title: "Travel Content Writer / Blogger", type: "Freelance", loc: "Remote", dept: "Content",
    desc: "Write inspiring travel guides, destination blogs, and itinerary descriptions for our website and social channels.",
    skills: ["Exceptional writing", "Travel experience in India", "SEO basics", "Photography a bonus"],
  },
];

const PERKS = [
  { icon: "mountain", label: "Free Annual Trek", desc: "All employees get one fully sponsored trek per year." },
  { icon: "users", label: "Close-knit Team", desc: "Small team, big impact. No corporate politics." },
  { icon: "calendar", label: "Flexible Work", desc: "Remote-first for office roles. Results over presence." },
  { icon: "seo", label: "Learning Budget", desc: "₹10,000/year for certifications, courses, and books." },
  { icon: "package", label: "Travel Discounts", desc: "50% off on all Hikes & Miles packages for you and family." },
  { icon: "check", label: "Health Cover", desc: "Medical insurance for full-time employees from day one." },
];

function CareersPage({ showToast }) {
  const [active, setActive] = useState(null);
  const [applied, setApplied] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", exp: "", note: "" });

  const handleApply = () => {
    if (!form.name || !form.email || !form.phone) { showToast?.("Please fill Name, Email and Phone."); return; }
    setApplied(active);
    setActive(null);
    setForm({ name: "", email: "", phone: "", exp: "", note: "" });
  };

  const opening = OPENINGS.find(o => o.id === active);

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, padding: "5rem 2rem", textAlign: "center" }}>
        <div className="sec-eyebrow" style={{ color: SAFFRON }}>Join the Team</div>
        <h1 className="sec-title" style={{ color: "#fff" }}>Careers at Hikes &amp; Miles</h1>
        <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto" }}>
          Work with a team that's as passionate about India as you are. We're always looking for guides, storytellers, planners, and travel nerds.
        </p>
      </div>

      {/* Perks */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="sec-inner">
          <div className="sec-eyebrow">Why Work With Us</div>
          <h2 className="sec-title">Perks &amp; Benefits</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1.25rem", marginTop: "2rem" }}>
            {PERKS.map(p => (
              <div key={p.label} style={{ background: CREAM, borderRadius: 14, padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, background: `${ACC}15`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I n={p.icon} s={18} c={ACC} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: DARK, fontSize: "0.9rem" }}>{p.label}</div>
                  <div style={{ color: "#666", fontSize: "0.8rem", marginTop: 3 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div className="sec-eyebrow">Open Positions</div>
          <h2 className="sec-title">Current Openings</h2>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {OPENINGS.map(job => (
              <div key={job.id} style={{ background: "#fff", borderRadius: 16, padding: "1.5rem 2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: applied === job.id ? `2px solid #2e7d32` : "1px solid #eee" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                      <span style={{ background: `${ACC}15`, color: ACC, borderRadius: 6, padding: "2px 10px", fontSize: "0.72rem", fontWeight: 600 }}>{job.dept}</span>
                      <span style={{ background: job.type === "Full-time" ? "#e8f5e9" : job.type === "Seasonal" ? "#fff3e0" : "#e3f2fd", color: job.type === "Full-time" ? "#2e7d32" : job.type === "Seasonal" ? "#e65100" : "#1565c0", borderRadius: 6, padding: "2px 10px", fontSize: "0.72rem", fontWeight: 600 }}>{job.type}</span>
                      <span style={{ color: "#aaa", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 3 }}><I n="map" s={11} c="#ccc" />{job.loc}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: DARK, fontSize: "1rem", marginBottom: "0.4rem" }}>{job.title}</div>
                    <div style={{ color: "#666", fontSize: "0.84rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{job.desc}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {job.skills.map(s => (
                        <span key={s} style={{ background: "#f5f5f5", color: "#555", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {applied === job.id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#2e7d32", fontWeight: 600, fontSize: "0.85rem" }}>
                        <I n="check" s={16} c="#2e7d32" /> Applied!
                      </div>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => setActive(job.id)}>Apply Now</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {active && opening && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setActive(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ fontWeight: 800, color: DARK, fontSize: "1.1rem" }}>{opening.title}</div>
                <div style={{ color: "#999", fontSize: "0.8rem" }}>{opening.type} · {opening.loc}</div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setActive(null)}>
                <I n="close" s={20} c="#aaa" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[["name","Full Name *","text"],["email","Email Address *","email"],["phone","Phone Number *","tel"],["exp","Years of Experience","text"]].map(([k,l,t]) => (
                <div key={k} className="a-fg">
                  <label className="a-lbl">{l}</label>
                  <input className="a-inp" type={t} placeholder={l} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
                </div>
              ))}
              <div className="a-fg">
                <label className="a-lbl">Cover Note</label>
                <textarea className="a-ta" rows={3} placeholder="Tell us why you're a great fit..." value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
              </div>
              <button className="btn btn-primary" style={{ marginTop: "0.5rem" }} onClick={handleApply}>
                <I n="send" s={16} c="#fff" /> Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* General Application */}
      <section className="sec" style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, textAlign: "center" }}>
        <div className="sec-inner">
          <h2 className="sec-title" style={{ color: "#fff" }}>Don't See a Fit?</h2>
          <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)" }}>We're always open to meeting passionate travellers and travel professionals. Drop us a note and we'll be in touch.</p>
          <a href="mailto:namaste@hikesandmiles.in?subject=General Application – Hikes & Miles" style={{ display: "inline-block", marginTop: "1.5rem" }}>
            <button className="btn btn-primary">Send Open Application</button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default CareersPage;
