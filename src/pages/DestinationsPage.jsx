import Stars from "../components/Stars";
import { ACC, DARK, FOREST, SAFFRON, CREAM, CAT_COLORS } from "../constants/colors";

function DestinationsPage({ data, go }) {
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${DARK},${FOREST})`,padding:"4rem 2rem",textAlign:"center" }}>
        <div className="sec-eyebrow" style={{ color:SAFFRON }}>🌍 Explore</div>
        <h1 className="sec-title" style={{ color:"#fff" }}>Destinations We Cover</h1>
        <p className="sec-sub" style={{ color:"rgba(255,255,255,0.65)" }}>All Indian. All incredible.</p>
      </div>
      <section className="sec" style={{ background:CREAM }}>
        <div className="sec-inner">
          <div className="dest-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))" }}>
            {data.destinations.map(d => (
              <div key={d.id} className="dest-card" style={{ aspectRatio:"4/3" }} onClick={() => go("packages")}>
                <img src={d.image} alt={d.name} />
                <div className="dest-grad" />
                <div className="dest-info">
                  <div className="dest-tag" style={{ background:CAT_COLORS[d.tag]||ACC }}>{d.tag}</div>
                  <div className="dest-name">{d.name}</div>
                  <div className="dest-state">{d.state}</div>
                  <div className="dest-rating"><Stars r={d.rating} s={12} /><span>{d.rating} · {d.reviews.toLocaleString("en-IN")}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DestinationsPage;
