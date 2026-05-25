import { useState } from "react";
import I from "../components/Icon";
import { ACC, DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

const BENEFITS = [
  { icon: "package", title: "Customised Itinerary", desc: "We tailor the route, pace, and activities to your group's interests and fitness levels." },
  { icon: "seo", title: "Exclusive Group Discounts", desc: "Groups of 10+ get up to 20% off the base package price. Bigger groups, bigger savings." },
  { icon: "users", title: "Dedicated Group Manager", desc: "A single point of contact from enquiry to return — handles all logistics, stays, and special requests." },
  { icon: "calendar", title: "Flexible Dates", desc: "Pick your own travel dates. We work around your group's schedule, not the other way around." },
  { icon: "book", title: "Custom Inclusions", desc: "Add-ons like photography, campfire dinners, cultural performances, or medical escorts — all customisable." },
  { icon: "check", title: "Priority Bookings", desc: "Group reservations are given priority for the best hotel rooms, forest permits, and vehicle allocation." },
];

const GROUP_TYPES = [
  { label: "Corporate Teams", icon: "users", desc: "Team offsites, leadership retreats, annual day trips — we specialise in professional group travel." },
  { label: "Family Reunions", icon: "mountain", desc: "Multi-generational trips with activities for all ages, from gentle walks to adventure safaris." },
  { label: "College Groups", icon: "book", desc: "Educational and recreational trips for student groups with special youth pricing." },
  { label: "Pilgrimage Groups", icon: "calendar", desc: "Sacred yatra tours for temples, churches, and dargahs with experienced spiritual guides." },
  { label: "NGO & Social Groups", icon: "seo", desc: "Community travel with a purpose — volunteering, conservation, and cultural exchange programs." },
  { label: "Wedding Travel", icon: "star", desc: "Pre-wedding trips, honeymoon groups, and destination wedding logistics in scenic Indian locales." },
];

const DISCOUNTS = [
  { size: "10–19", disc: "10% off", color: "#e3f2fd" },
  { size: "20–29", disc: "15% off", color: "#e8f5e9" },
  { size: "30–49", disc: "20% off", color: "#fff3e0" },
  { size: "50+", disc: "Custom pricing", color: `${ACC}15` },
];

function GroupBookingsPage({ go, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", size: "", dest: "", date: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.size) { showToast?.("Please fill Name, Phone and Group Size."); return; }
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, padding: "5rem 2rem", textAlign: "center" }}>
        <div className="sec-eyebrow" style={{ color: SAFFRON }}>Travel Together</div>
        <h1 className="sec-title" style={{ color: "#fff" }}>Group Bookings</h1>
        <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto" }}>
          Planning a trip for 10 to 500 people? We've done it all — corporate retreats, family pilgrimages, college expeditions, and more.
        </p>
      </div>

      {/* Discount Table */}
      <div style={{ background: "#fff", padding: "2rem" }}>
        <div className="sec-inner">
          <h2 style={{ textAlign: "center", color: DARK, fontWeight: 800, marginBottom: "1.5rem", fontSize: "1.3rem" }}>Group Discount Structure</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem" }}>
            {DISCOUNTS.map(d => (
              <div key={d.size} style={{ background: d.color, borderRadius: 14, padding: "1.25rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: DARK }}>{d.disc}</div>
                <div style={{ fontSize: "0.8rem", color: "#666", marginTop: 4 }}>{d.size} travellers</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div className="sec-eyebrow">Why Book as a Group</div>
          <h2 className="sec-title">Everything We Do for Your Group</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.25rem", marginTop: "2.5rem" }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{ background: "#fff", borderRadius: 14, padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 42, height: 42, background: `${ACC}15`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I n={b.icon} s={19} c={ACC} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: DARK, marginBottom: 4 }}>{b.title}</div>
                  <div style={{ color: "#666", fontSize: "0.83rem", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Types */}
      <section className="sec">
        <div className="sec-inner">
          <div className="sec-eyebrow">We Cater To</div>
          <h2 className="sec-title">All Kinds of Groups</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem", marginTop: "2rem" }}>
            {GROUP_TYPES.map(g => (
              <div key={g.label} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 38, height: 38, background: `${SAFFRON}20`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I n={g.icon} s={16} c={SAFFRON} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: DARK, fontSize: "0.9rem" }}>{g.label}</div>
                  <div style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.6, marginTop: 3 }}>{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="sec-eyebrow">Get a Quote</div>
          <h2 className="sec-title">Send Us Your Group Details</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 2rem", background: "#fff", borderRadius: 20, marginTop: "2rem" }}>
              <div style={{ width: 64, height: 64, background: "#e8f5e9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <I n="check" s={28} c="#2e7d32" />
              </div>
              <h3 style={{ color: DARK }}>Enquiry Submitted!</h3>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>Our group travel manager will reach out within 24 hours with a customised quote.</p>
              <button className="btn btn-primary" onClick={() => go("packages")}>Browse Packages</button>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "2rem", marginTop: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[["name","Your Name *","text"],["email","Email Address","email"],["phone","Phone Number *","tel"],["org","Organisation / Group Name","text"]].map(([k,l,t]) => (
                  <div key={k} className="a-fg">
                    <label className="a-lbl">{l}</label>
                    <input className="a-inp" type={t} placeholder={l} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                <div className="a-fg">
                  <label className="a-lbl">Group Size *</label>
                  <select className="a-sel" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))}>
                    <option value="">Select</option>
                    {["10–19","20–29","30–49","50–99","100+"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="a-fg">
                  <label className="a-lbl">Preferred Destination</label>
                  <input className="a-inp" placeholder="e.g. Char Dham" value={form.dest} onChange={e => setForm(f => ({ ...f, dest: e.target.value }))} />
                </div>
                <div className="a-fg">
                  <label className="a-lbl">Travel Month</label>
                  <input className="a-inp" type="month" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <div className="a-fg" style={{ marginTop: "1rem" }}>
                <label className="a-lbl">Special Requirements</label>
                <textarea className="a-ta" rows={3} placeholder="Any special needs, accessibility requirements, dietary restrictions..." value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} />
              </div>
              <button className="btn btn-primary" style={{ marginTop: "1.25rem", width: "100%" }} onClick={handleSubmit}>
                <I n="send" s={17} c="#fff" /> Submit Group Enquiry
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default GroupBookingsPage;
