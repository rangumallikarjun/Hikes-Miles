import PkgCard from "../components/PkgCard";
import { DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

function PackagesPage({ data, catFilter, setCatFilter, go }) {
  const cats = ["All","Pilgrimage","Tiger Safari","Adventure","Heritage","Leisure","Trekking"];
  const filtered = catFilter==="All" ? data.packages : data.packages.filter(p => p.category===catFilter);
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${DARK},${FOREST})`,padding:"4rem 2rem",textAlign:"center" }}>
        <div className="sec-eyebrow" style={{ color:SAFFRON }}>✈️ All India Packages</div>
        <h1 className="sec-title" style={{ color:"#fff" }}>Choose Your India Adventure</h1>
        <p className="sec-sub" style={{ color:"rgba(255,255,255,0.65)" }}>Pilgrimages, tiger safaris, Himalayan treks, heritage tours — every Indian experience in one place.</p>
      </div>
      <section className="sec" style={{ background:CREAM }}>
        <div className="sec-inner">
          <div className="cat-strip">
            {cats.map(c => (
              <button key={c} className={`cat-btn${catFilter===c?" on":""}`} onClick={() => setCatFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="pkg-grid">
            {filtered.map(pkg => <PkgCard key={pkg.id} pkg={pkg} go={go} />)}
          </div>
          {filtered.length === 0 && <div style={{ textAlign:"center",padding:"4rem",color:"#aaa" }}>No packages found.</div>}
        </div>
      </section>
    </div>
  );
}

export default PackagesPage;
