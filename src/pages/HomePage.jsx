import I from "../components/Icon";
import Stars from "../components/Stars";
import PkgCard from "../components/PkgCard";
import BlogCard from "../components/BlogCard";
import HERO_BG from "../constants/hero-bg.png";
import { ACC, DARK, FOREST, SAFFRON, CREAM, CAT_COLORS } from "../constants/colors";

function HomePage({ data, go, setCatFilter, testiPage, setTestiPage }) {
  const visibleTestis = 3;
  const maxPage = Math.ceil(data.testimonials.length / visibleTestis) - 1;
  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="hero-grad" />
        <div className="hero-pattern" />
        <div className="hero-body">
          <div>
            <div className="hero-pill">🇮🇳 &nbsp;100% India. Curated with Love.</div>
            <h1 className="hero-h1">Discover the <em>Soul</em> of<br />Incredible India</h1>
            <p className="hero-sub">{data.brand.heroSubtitle}</p>
            <div className="hero-btns">
              <button className="btn btn-primary" onClick={() => go("packages")}>Explore All Packages <I n="arrow" s={16} c="#fff" /></button>
              <button className="btn btn-ghost" onClick={() => go("destinations")}>View Destinations</button>
            </div>
          </div>
        </div>
        <div className="hero-strip">
          {[["50+","Destinations Covered"],["8K+","Happy Travellers"],["15+","Years in India Travel"],["4.9★","Average Rating"]].map(([n,l]) => (
            <div className="hero-stat" key={l}>
              <div className="stat-n"><span>{n}</span></div>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY QUICK LINKS */}
      <div style={{ background: CREAM, padding:"2rem 0" }}>
        <div style={{ maxWidth:1220,margin:"0 auto",padding:"0 1.25rem" }}>
          <div className="cat-strip-inner" style={{ display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap" }}>
            {[["🛕","Char Dham Yatra","Pilgrimage"],["🐯","Tiger Safaris","Tiger Safari"],["🏔️","Himalayan Treks","Adventure"],["🏛️","Heritage Tours","Heritage"],["🌴","Leisure Escapes","Leisure"],["🥾","Trekking","Trekking"],["✨","Custom Trip","custom"]].map(([em,label,cat]) => (
              <div key={label} onClick={() => cat==="custom" ? go("custom-package") : (() => { setCatFilter(cat); go("packages"); })()} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:7,padding:"1rem 1.25rem",background: cat==="custom" ? `${ACC}15` : "#fff",borderRadius:14,cursor:"pointer",minWidth:110,flexShrink:0,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",transition:"all .25s",border: cat==="custom" ? `2px solid ${ACC}` : "2px solid transparent" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=ACC}
                onMouseLeave={e=>{ if(cat!=="custom") e.currentTarget.style.borderColor="transparent"; }}>
                <div style={{ fontSize:"1.6rem" }}>{em}</div>
                <div style={{ fontSize:"0.75rem",fontWeight:600,color: cat==="custom" ? ACC : DARK,textAlign:"center",lineHeight:1.3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESTINATIONS */}
      <section className="sec" style={{ background:"#fff" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">🌍 Explore India</div>
            <h2 className="sec-title">India's Most Iconic Destinations</h2>
            <p className="sec-sub">From sacred Himalayan peaks to the tiger-filled heart of Madhya Pradesh — every corner of India calls.</p>
          </div>
          <div className="dest-grid">
            {data.destinations.map(d => (
              <div key={d.id} className="dest-card" onClick={() => go("packages")}>
                <img src={d.image} alt={d.name} />
                <div className="dest-grad" />
                <div className="dest-info">
                  <div className="dest-tag" style={{ background: CAT_COLORS[d.tag] || ACC }}>{d.tag}</div>
                  <div className="dest-name">{d.name}</div>
                  <div className="dest-state">{d.state}</div>
                  <div className="dest-rating"><Stars r={d.rating} s={12} /><span>{d.rating} · {d.reviews.toLocaleString("en-IN")} reviews</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="sec" style={{ background: CREAM }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">✈️ Handpicked Journeys</div>
            <h2 className="sec-title">Our Signature India Packages</h2>
            <p className="sec-sub">From the sacred Char Dham circuit to the thrill of tiger safaris — every package is expertly crafted for you.</p>
          </div>
          <div className="pkg-grid">
            {data.packages.slice(0, 4).map(pkg => <PkgCard key={pkg.id} pkg={pkg} go={go} />)}
          </div>
          <div style={{ textAlign:"center",marginTop:"2.5rem" }}>
            <button className="btn btn-dark" onClick={() => go("packages")}>See All 8 Packages <I n="arrow" s={16} c="#fff" /></button>
          </div>
        </div>
      </section>

      {/* CHAR DHAM FEATURE BANNER */}
      <div style={{ background:`linear-gradient(135deg,#8B4513,#B85C1A)`,padding:"4rem 1.5rem",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,right:0,bottom:0,width:"45%",backgroundImage:"url('https://wsrv.nl/?url=images.unsplash.com/photo-1506905925346-21bda4d32df4&w=800&q=80&fit=cover')",backgroundSize:"cover",backgroundPosition:"center",opacity:0.25 }} />
        <div style={{ maxWidth:1220,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div className="char-dham-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#ffe8c0",padding:"5px 14px",borderRadius:50,fontSize:"0.73rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"1rem" }}>🛕 MOST SACRED JOURNEY</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:700,color:"#fff",lineHeight:1.15,marginBottom:"1rem" }}>Char Dham Yatra 2026 — Booking Open</h2>
              <p style={{ fontSize:"0.92rem",color:"rgba(255,255,255,0.8)",lineHeight:1.75,marginBottom:"1.5rem" }}>Yamunotri · Gangotri · Kedarnath · Badrinath. Join our registered, GMVN-approved pilgrimage with puja assistance at every dham. Limited batches — secure your spot today.</p>
              <div style={{ display:"flex",gap:"1rem",marginBottom:"1.75rem",flexWrap:"wrap" }}>
                {["12 Days / 11 Nights","All meals included","Pandit assistance","Helicopter option"].map(f => (
                  <div key={f} style={{ display:"flex",alignItems:"center",gap:7,fontSize:"0.82rem",color:"rgba(255,255,255,0.85)" }}><I n="check" s={14} c={SAFFRON} />{f}</div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => go("pkg-detail", data.packages[0])} style={{ fontSize:"0.9rem",padding:"13px 24px",width:"100%",maxWidth:340,justifyContent:"center" }}>View Char Dham Package ₹26,999 onwards</button>
            </div>
            <div className="char-dham-dhams" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
              {[["Yamunotri","Goddess of Yamuna","🏔️"],["Gangotri","Source of Ganga","💧"],["Kedarnath","Abode of Shiva","🕉️"],["Badrinath","Vishnu's Domain","🪔"]].map(([name,desc,em]) => (
                <div key={name} style={{ background:"rgba(255,255,255,0.12)",borderRadius:14,padding:"1rem",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ fontSize:"1.4rem",marginBottom:"0.4rem" }}>{em}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",fontWeight:700,color:"#fff",marginBottom:"3px" }}>{name}</div>
                  <div style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.65)" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TIGER SAFARI FEATURE BANNER */}
      <div style={{ background:`linear-gradient(135deg,${FOREST},#0f2a0f)`,padding:"4rem 1.5rem",position:"relative",overflow:"hidden" }}>
        <div style={{ maxWidth:1220,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
            <div className="sec-eyebrow" style={{ color:SAFFRON }}>🐯 TIGER SAFARIS</div>
            <h2 className="sec-title" style={{ color:"#fff" }}>Hunt for the Royal Bengal Tiger</h2>
            <p className="sec-sub" style={{ color:"rgba(255,255,255,0.65)" }}>Three of India's finest tiger reserves — each with its own wild soul.</p>
          </div>
          <div className="tiger-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.25rem" }}>
            {data.packages.filter(p => p.category === "Tiger Safari").map(pkg => (
              <div key={pkg.id} onClick={() => go("pkg-detail", pkg)} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(247,148,29,0.15)",borderRadius:18,overflow:"hidden",cursor:"pointer",transition:"all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor="rgba(247,148,29,0.4)" }}
                onMouseLeave={e => { e.currentTarget.style.transform="";e.currentTarget.style.borderColor="rgba(247,148,29,0.15)" }}>
                <div style={{ height:170,overflow:"hidden" }}>
                  <img src={pkg.image} alt={pkg.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s" }} />
                </div>
                <div style={{ padding:"1.25rem" }}>
                  <div style={{ display:"inline-block",background:FOREST,color:SAFFRON,fontSize:"0.68rem",fontWeight:700,padding:"3px 10px",borderRadius:50,border:"1px solid rgba(247,148,29,0.3)",marginBottom:"0.5rem" }}>{pkg.badge}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#fff",marginBottom:"0.3rem" }}>{pkg.name}</div>
                  <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:"0.75rem" }}>{pkg.state}</div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:SAFFRON }}>₹{pkg.price.toLocaleString("en-IN")}<span style={{ fontFamily:"Outfit",fontSize:"0.68rem",color:"rgba(255,255,255,0.4)",fontWeight:400 }}>/person</span></div>
                    <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:"0.76rem",color:"rgba(255,255,255,0.6)" }}><Stars r={pkg.rating} s={12} />{pkg.rating}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testi-wrap">
        <div style={{ maxWidth:1220,margin:"0 auto" }}>
          <div className="sec-head">
            <div className="sec-eyebrow" style={{ color:SAFFRON }}>💬 Real Traveller Stories</div>
            <h2 className="sec-title" style={{ color:"#fff" }}>What Our Explorers Say</h2>
          </div>
          <div style={{ overflow:"hidden" }}>
            <div className="testi-slider" style={{ transform:`translateX(calc(-${testiPage * (320+24)}px))` }}>
              {data.testimonials.map(t => (
                <div key={t.id} className="testi-card">
                  <div style={{ marginBottom:"0.85rem" }}><Stars r={t.rating} s={14} /></div>
                  <p className="testi-quote">"{t.text}"</p>
                  <div className="testi-author">
                    <div className="testi-av">{t.avatar}</div>
                    <div>
                      <div className="testi-nm">{t.name}</div>
                      <div className="testi-loc">{t.location}</div>
                      <div className="testi-pkg">{t.package}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testi-nav">
            <button className="btn" style={{ background:"rgba(255,255,255,0.1)",color:"#fff",padding:"8px 14px" }} onClick={() => setTestiPage(p => Math.max(0, p-1))}><I n="chevronL" s={18} c="#fff" /></button>
            {[...Array(maxPage+1)].map((_, i) => (
              <div key={i} className={`testi-dot${testiPage===i?" on":""}`} onClick={() => setTestiPage(i)} />
            ))}
            <button className="btn" style={{ background:"rgba(255,255,255,0.1)",color:"#fff",padding:"8px 14px" }} onClick={() => setTestiPage(p => Math.min(maxPage, p+1))}><I n="chevronR" s={18} c="#fff" /></button>
          </div>
        </div>
      </div>

      {/* OFFERS */}
      <section className="sec" style={{ background:"#fff" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">🏷️ Limited-Time Deals</div>
            <h2 className="sec-title">Exclusive Offers & Discounts</h2>
          </div>
          <div className="offers-grid">
            {data.offers.map(o => (
              <div key={o.id} className="offer-card" style={{ background:`linear-gradient(135deg,${o.color},${o.color}cc)` }}>
                <div className="offer-disc">{o.discount}</div>
                <div className="offer-title">{o.title}</div>
                <div className="offer-desc">{o.desc}</div>
                <div className="offer-code-wrap"><div className="offer-code">USE: {o.code}</div></div>
                <div className="offer-exp">Valid until: {o.expiry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="sec" style={{ background:CREAM }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">📖 Travel Guides & Stories</div>
            <h2 className="sec-title">Read Before You Go</h2>
          </div>
          <div className="blog-grid">
            {data.blog.map(post => <BlogCard key={post.id} post={post} go={go} />)}
          </div>
          <div style={{ textAlign:"center",marginTop:"2.5rem" }}>
            <button className="btn btn-dark" onClick={() => go("blog")}>All Articles <I n="arrow" s={16} c="#fff" /></button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-sec">
        <div className="sec-inner">
          <div style={{ fontSize:"2.5rem",marginBottom:"1rem" }}>🗺️</div>
          <h2 className="cta-title">Ready to Explore Incredible India?</h2>
          <p className="cta-sub">Tell us where you want to go — our India travel experts will design the perfect trip for you, end to end.</p>
          <div className="cta-btns">
            <button className="btn" style={{ background:"#fff",color:ACC,fontWeight:700 }} onClick={() => go("booking")}>Book a Package <I n="arrow" s={16} c={ACC} /></button>
            <button className="btn btn-ghost" style={{ borderColor:"rgba(255,255,255,0.5)" }} onClick={() => go("packages")}>Browse All Packages</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
