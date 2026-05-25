import I from "../components/Icon";
import { ACC, DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

const STATS = [
  { n: "12+", l: "Years of Experience" },
  { n: "18,000+", l: "Happy Travellers" },
  { n: "120+", l: "Destinations Covered" },
  { n: "98%", l: "Satisfaction Rate" },
];

const VALUES = [
  { icon: "mountain", title: "Authentic Experiences", desc: "We craft journeys rooted in India's true culture — not tourist traps but real, immersive experiences with local communities." },
  { icon: "users", title: "Expert Local Guides", desc: "Every guide is certified, locally born, and deeply passionate about sharing the hidden gems of their region." },
  { icon: "check", title: "Safety First, Always", desc: "From medical kits to emergency protocols and GMVN-approved stays, your safety is non-negotiable on every trip." },
  { icon: "seo", title: "Sustainable Travel", desc: "We plant a tree for every booking and partner only with eco-friendly stays to protect the landscapes we love." },
];

const TIMELINE = [
  { year: "2013", title: "Founded in Hyderabad", desc: "Mallikarjun Rangu founded Hikes & Miles with a single Char Dham Yatra group of 12 pilgrims." },
  { year: "2016", title: "Tiger Safari Launch", desc: "Added Pench & Tadoba wildlife circuits after noticing a gap in authentic jungle experience operators." },
  { year: "2019", title: "Himalayan Treks Division", desc: "Launched Leh-Ladakh and Spiti Valley circuits with trained high-altitude guides." },
  { year: "2022", title: "10,000 Travellers Milestone", desc: "Celebrated a decade of journeys with over 10,000 happy travellers across India." },
  { year: "2024", title: "Digital Transformation", desc: "Launched our full online booking platform so every Indian can plan their dream trip from anywhere." },
  { year: "2026", title: "18,000+ & Growing", desc: "Today, Hikes & Miles is one of India's most trusted boutique travel companies." },
];

function AboutPage({ go, data }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, padding: "5rem 2rem", textAlign: "center" }}>
        <div className="sec-eyebrow" style={{ color: SAFFRON }}>Our Story</div>
        <h1 className="sec-title" style={{ color: "#fff", maxWidth: 680, margin: "0 auto 1rem" }}>Born in India. Built for India's Wanderers.</h1>
        <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 2rem" }}>
          Hikes &amp; Miles started as a passion project by a group of trekkers from Hyderabad who believed that every Indian deserves to experience the magic of their own country.
        </p>
        <button className="btn btn-primary" onClick={() => go("packages")}>Explore Our Packages</button>
      </div>

      {/* Stats */}
      <div style={{ background: ACC, padding: "2.5rem 2rem" }}>
        <div className="sec-inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1.5rem", textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.n}>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff" }}>{s.n}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="sec-eyebrow">Our Mission</div>
            <h2 className="sec-title" style={{ textAlign: "left", fontSize: "2rem" }}>Making India's Beauty Accessible to Every Indian</h2>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1rem" }}>
              We believe the best way to truly know India is to travel within it. From the ice-cold streams of Ladakh to the backwaters of Kerala, from the sacred ghats of Varanasi to the royal forts of Rajasthan — India is endlessly rich.
            </p>
            <p style={{ color: "#555", lineHeight: 1.8 }}>
              Our mission is simple: remove the complexity of planning and replace it with joy, trust, and unforgettable memories — all at prices that don't break the bank.
            </p>
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}>
            <img src="https://wsrv.nl/?url=images.unsplash.com/photo-1506905925346-21bda4d32df4&w=800&q=80&fit=cover" alt="Char Dham mountains" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="sec">
        <div className="sec-inner">
          <div className="sec-eyebrow">What We Stand For</div>
          <h2 className="sec-title">Our Core Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 48, height: 48, background: `${ACC}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <I n={v.icon} s={22} c={ACC} />
                </div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: DARK, marginBottom: "0.5rem" }}>{v.title}</div>
                <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div className="sec-eyebrow">Our Journey</div>
          <h2 className="sec-title">A Decade of Memories</h2>
          <div style={{ maxWidth: 640, margin: "2.5rem auto 0", position: "relative" }}>
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: `${ACC}30` }} />
            {TIMELINE.map((t, i) => (
              <div key={t.year} style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", position: "relative" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === TIMELINE.length - 1 ? ACC : "#fff", border: `2px solid ${ACC}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, fontSize: "0.7rem", fontWeight: 800, color: i === TIMELINE.length - 1 ? "#fff" : ACC }}>{t.year}</div>
                <div style={{ paddingTop: 12 }}>
                  <div style={{ fontWeight: 700, color: DARK, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, textAlign: "center" }}>
        <div className="sec-inner">
          <h2 className="sec-title" style={{ color: "#fff" }}>Ready to Start Your Journey?</h2>
          <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)" }}>Join 18,000+ travellers who chose Hikes &amp; Miles for their most memorable trips.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <button className="btn btn-primary" onClick={() => go("packages")}>View Packages</button>
            <button className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => go("booking")}>Enquire Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
