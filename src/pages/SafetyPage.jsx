import I from "../components/Icon";
import { ACC, DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

const POLICIES = [
  {
    icon: "check",
    title: "Pre-Trip Medical Screening",
    points: [
      "All participants fill a health declaration form before high-altitude treks.",
      "Our guides carry pulse oximeters on every Himalayan journey.",
      "We recommend consulting a physician before trips above 3,500m.",
      "Pre-trip fitness guidelines are shared 2 weeks in advance.",
    ],
  },
  {
    icon: "users",
    title: "Certified & Trained Guides",
    points: [
      "All trekking guides are NIMAS or HMI certified.",
      "Wildlife guides are WWF-certified naturalists.",
      "Pilgrimage guides are GMVN and state tourism board approved.",
      "Guides undergo refresher safety training every year.",
    ],
  },
  {
    icon: "mountain",
    title: "Equipment & Gear Standards",
    points: [
      "All camping equipment is BIS-approved and inspected before every trip.",
      "First-aid kits with altitude sickness medication on every trek.",
      "Emergency satellite communication devices on remote trails.",
      "Personal protective equipment provided for all adventure activities.",
    ],
  },
  {
    icon: "calendar",
    title: "Emergency Evacuation Protocol",
    points: [
      "24/7 emergency helpline (+91 9666962337) active for all ongoing trips.",
      "Helicopter evacuation partnerships in Uttarakhand, Himachal & Ladakh.",
      "Nearest hospital contacts briefed to all travellers before departure.",
      "Trip leaders trained in wilderness first aid and CPR.",
    ],
  },
  {
    icon: "seo",
    title: "Travel Insurance",
    points: [
      "We strongly recommend travel insurance for all bookings.",
      "Group insurance is included on all Himalayan & adventure packages.",
      "We partner with TATA AIG and Bajaj Allianz for travel cover.",
      "Coverage details are shared at time of booking confirmation.",
    ],
  },
  {
    icon: "book",
    title: "Vehicle & Transport Safety",
    points: [
      "All vehicles are insured, regularly serviced, and fit-certified.",
      "Drivers carry valid commercial licences and route experience.",
      "No night driving on mountain roads — camp before sunset.",
      "Maximum passenger limits strictly enforced on all vehicles.",
    ],
  },
];

function SafetyPage({ go }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, padding: "5rem 2rem", textAlign: "center" }}>
        <div className="sec-eyebrow" style={{ color: SAFFRON }}>Your Safety Matters</div>
        <h1 className="sec-title" style={{ color: "#fff" }}>Safety Policy</h1>
        <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto" }}>
          At Hikes &amp; Miles, safety is not an afterthought — it's baked into every decision we make, from the routes we choose to the guides we hire.
        </p>
      </div>

      {/* Commitment Banner */}
      <div style={{ background: "#e8f5e9", borderBottom: "3px solid #2e7d32", padding: "1.5rem 2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <I n="check" s={20} c="#2e7d32" />
          <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: "0.95rem" }}>
            Zero serious safety incidents in 12+ years of operation across 120+ destinations.
          </span>
        </div>
      </div>

      {/* Policies */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div className="sec-eyebrow">Our Commitments</div>
          <h2 className="sec-title">What We Do to Keep You Safe</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
            {POLICIES.map(p => (
              <div key={p.title} style={{ background: "#fff", borderRadius: 16, padding: "1.75rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                  <div style={{ width: 44, height: 44, background: `${ACC}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I n={p.icon} s={20} c={ACC} />
                  </div>
                  <div style={{ fontWeight: 700, color: DARK, fontSize: "0.95rem" }}>{p.title}</div>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 1rem" }}>
                  {p.points.map(pt => (
                    <li key={pt} style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.35rem" }}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="sec" style={{ background: "#fff3e0" }}>
        <div className="sec-inner" style={{ textAlign: "center" }}>
          <div style={{ width: 60, height: 60, background: SAFFRON, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <I n="phone" s={26} c="#fff" />
          </div>
          <h2 style={{ color: DARK, fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>24/7 Emergency Helpline</h2>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: ACC, marginBottom: "0.5rem" }}>+91 9666962337</div>
          <p style={{ color: "#666", maxWidth: 480, margin: "0 auto 1.5rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Our emergency response team is available around the clock for all travellers currently on a Hikes &amp; Miles trip. WhatsApp is also active on this number.
          </p>
          <button className="btn btn-primary" onClick={() => go("booking")}>Plan a Safe Trip</button>
        </div>
      </section>

      {/* Traveller Responsibilities */}
      <section className="sec">
        <div className="sec-inner" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="sec-eyebrow">Shared Responsibility</div>
          <h2 className="sec-title">What We Ask of Our Travellers</h2>
          <div style={{ marginTop: "1.5rem" }}>
            {[
              "Disclose any medical conditions (heart, BP, respiratory) at time of booking.",
              "Follow guide instructions at all times — especially at altitude or in wildlife zones.",
              "Do not venture beyond designated safe zones without guide supervision.",
              "Carry your prescribed medication and inform your guide about it.",
              "Respect local environment — no littering, no feeding wildlife.",
              "Adhere to the physical fitness requirements shared in your pre-trip kit.",
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: "0.9rem", alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, background: `${ACC}15`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <I n="check" s={12} c={ACC} />
                </div>
                <span style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.7 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SafetyPage;
