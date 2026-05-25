import I from "../components/Icon";
import Stars from "../components/Stars";
import { ACC, DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

const GUIDES = [
  {
    name: "Rajesh Negi",
    role: "Himalayan Trekking Expert",
    location: "Manali, Himachal Pradesh",
    exp: "14 years",
    rating: 4.9,
    trips: 312,
    langs: ["Hindi", "English", "Pahadi"],
    specialties: ["High-altitude Treks", "Spiti Valley", "Leh-Ladakh", "River Crossings"],
    cert: "NIMAS Certified",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1507003211169-0a1dd7228f2d&w=400&q=80&fit=cover&crop=face",
    quote: "Every mountain has a story. I'm just the one who helps you read it.",
  },
  {
    name: "Priya Sharma",
    role: "Wildlife & Jungle Safari Guide",
    location: "Nagpur, Maharashtra",
    exp: "9 years",
    rating: 4.8,
    trips: 220,
    langs: ["Hindi", "English", "Marathi"],
    specialties: ["Tadoba Tiger Reserve", "Pench National Park", "Bird Watching", "Night Safaris"],
    cert: "WWF Certified Naturalist",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=cover&crop=face",
    quote: "Nature speaks. I simply translate.",
  },
  {
    name: "Arjun Pillai",
    role: "Kerala & South India Expert",
    location: "Kochi, Kerala",
    exp: "11 years",
    rating: 5.0,
    trips: 278,
    langs: ["Malayalam", "Tamil", "English", "Hindi"],
    specialties: ["Kerala Backwaters", "Munnar Tea Trails", "Coastal Treks", "Temple Circuits"],
    cert: "Kerala Tourism Approved",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=cover&crop=face",
    quote: "The backwaters carry a peace you can't find on any map.",
  },
  {
    name: "Meera Devi",
    role: "Pilgrimage & Spiritual Journeys",
    location: "Haridwar, Uttarakhand",
    exp: "16 years",
    rating: 4.9,
    trips: 410,
    langs: ["Hindi", "Sanskrit", "English"],
    specialties: ["Char Dham Yatra", "Kashi Vishwanath", "Vaishno Devi", "Ganga Aarti"],
    cert: "GMVN & Uttarakhand Tourism Approved",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=cover&crop=face",
    quote: "A pilgrimage is not just a journey to a temple — it's a journey within.",
  },
  {
    name: "Vikram Rathore",
    role: "Rajasthan Heritage & Culture Guide",
    location: "Jaipur, Rajasthan",
    exp: "13 years",
    rating: 4.8,
    trips: 345,
    langs: ["Rajasthani", "Hindi", "English"],
    specialties: ["Rajput Forts", "Desert Safaris", "Camel Treks", "Folk Culture"],
    cert: "ITDC Certified",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=cover&crop=face",
    quote: "Rajasthan is not just a state — it's an emotion.",
  },
  {
    name: "Fatima Ansari",
    role: "Backpacker & Budget Travel Expert",
    location: "Delhi",
    exp: "7 years",
    rating: 4.7,
    trips: 190,
    langs: ["Urdu", "Hindi", "English"],
    specialties: ["North India Circuits", "Budget Travel", "Youth Groups", "Solo Traveller Safety"],
    cert: "Ministry of Tourism Approved",
    img: "https://wsrv.nl/?url=images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fit=cover&crop=face",
    quote: "Budget travel is not compromise — it's resourcefulness.",
  },
];

function GuidesPage({ go }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, padding: "5rem 2rem", textAlign: "center" }}>
        <div className="sec-eyebrow" style={{ color: SAFFRON }}>Meet the Team</div>
        <h1 className="sec-title" style={{ color: "#fff" }}>Our Expert Guides</h1>
        <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto" }}>
          Locals by birth, storytellers by passion. Every Hikes &amp; Miles guide is vetted, certified, and deeply in love with India's landscapes.
        </p>
      </div>

      {/* Why Our Guides */}
      <div style={{ background: ACC, padding: "2rem" }}>
        <div className="sec-inner" style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", textAlign: "center" }}>
          {[
            ["check", "Background Verified"],
            ["seo", "Government Certified"],
            ["users", "Regionally Specialised"],
            ["book", "Multilingual"],
          ].map(([ic, lbl]) => (
            <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
              <I n={ic} s={18} c="#fff" />
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
            {GUIDES.map(g => (
              <div key={g.name} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "1rem", padding: "1.5rem 1.5rem 1rem" }}>
                  <img src={g.img} alt={g.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `3px solid ${ACC}20` }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: DARK }}>{g.name}</div>
                    <div style={{ fontSize: "0.8rem", color: ACC, fontWeight: 600 }}>{g.role}</div>
                    <div style={{ fontSize: "0.75rem", color: "#999", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <I n="map" s={11} c="#bbb" />{g.location}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "0 1.5rem", display: "flex", gap: "1rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, color: DARK }}>{g.exp}</div>
                    <div style={{ fontSize: "0.72rem", color: "#999" }}>Experience</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, color: DARK }}>{g.trips}+</div>
                    <div style={{ fontSize: "0.72rem", color: "#999" }}>Trips Led</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Stars r={g.rating} s={11} />
                    <div style={{ fontSize: "0.72rem", color: "#999" }}>{g.rating}</div>
                  </div>
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #f5f5f5", marginTop: "1rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.5rem", fontWeight: 600 }}>SPECIALTIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {g.specialties.map(s => (
                      <span key={s} style={{ background: `${ACC}12`, color: ACC, borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "0 1.5rem 1rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.35rem", fontWeight: 600 }}>LANGUAGES</div>
                  <div style={{ fontSize: "0.8rem", color: "#555" }}>{g.langs.join(" · ")}</div>
                </div>
                <div style={{ margin: "0 1.5rem 1rem", background: CREAM, borderRadius: 10, padding: "0.75rem 1rem", borderLeft: `3px solid ${SAFFRON}` }}>
                  <div style={{ fontSize: "0.8rem", color: "#666", fontStyle: "italic", lineHeight: 1.6 }}>"{g.quote}"</div>
                </div>
                <div style={{ padding: "0 1.5rem 1.5rem" }}>
                  <span style={{ background: `${FOREST}15`, color: FOREST, borderRadius: 6, padding: "3px 10px", fontSize: "0.72rem", fontWeight: 600 }}>✓ {g.cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: `linear-gradient(135deg,${DARK},${FOREST})`, textAlign: "center" }}>
        <div className="sec-inner">
          <h2 className="sec-title" style={{ color: "#fff" }}>Travel with India's Best</h2>
          <p className="sec-sub" style={{ color: "rgba(255,255,255,0.65)" }}>Request a specific guide when you book or let us match you with the perfect expert for your destination.</p>
          <button className="btn btn-primary" style={{ marginTop: "2rem" }} onClick={() => go("booking")}>Book a Trip</button>
        </div>
      </section>
    </div>
  );
}

export default GuidesPage;
