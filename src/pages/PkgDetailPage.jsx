import { useState } from "react";
import I from "../components/Icon";
import Stars from "../components/Stars";
import { ACC, DARK, SAFFRON, CREAM, CAT_COLORS } from "../constants/colors";

function PkgDetailPage({ selPkg, allReviews, addReview, markHelpful, go, showToast, data }) {
  const pkg = selPkg;
  if (!pkg) return null;

  const hasTiers = pkg.tiers && pkg.tiers.length > 0;
  const [activeTier, setActiveTier] = useState(hasTiers ? pkg.tiers[0] : null);

  const displayHighlights = hasTiers && activeTier ? activeTier.highlights : pkg.highlights;
  const displayItinerary  = hasTiers && activeTier ? activeTier.itinerary  : pkg.itinerary;
  const displayIncludes   = hasTiers && activeTier ? activeTier.includes   : pkg.includes;
  const displayPrice      = hasTiers && activeTier ? activeTier.price      : pkg.price;
  const displayOrigPrice  = hasTiers && activeTier ? activeTier.originalPrice : pkg.originalPrice;
  const displayDuration   = hasTiers && activeTier ? `${activeTier.days} Days / ${activeTier.nights} Nights` : pkg.duration;

  const pkgReviews = (allReviews[pkg.id] || []).filter(r => r.approved);
  const [revFilter, setRevFilter] = useState("All");
  const [revSort, setRevSort] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const [revForm, setRevForm] = useState({ name:"", location:"", email:"", rating:0, title:"", body:"" });
  const [revFormErr, setRevFormErr] = useState("");

  const ratingCounts = [5,4,3,2,1].map(r => ({ r, count:pkgReviews.filter(rv=>rv.rating===r).length, pct:pkgReviews.length?Math.round(pkgReviews.filter(rv=>rv.rating===r).length/pkgReviews.length*100):0 }));
  const avgRating = pkgReviews.length ? (pkgReviews.reduce((s,r)=>s+r.rating,0)/pkgReviews.length).toFixed(1) : pkg.rating;

  const filtered = pkgReviews.filter(r=>revFilter==="All"||r.rating===Number(revFilter)).sort((a,b)=>{
    if(revSort==="newest") return new Date(b.date)-new Date(a.date);
    if(revSort==="helpful") return b.helpful-a.helpful;
    if(revSort==="highest") return b.rating-a.rating;
    if(revSort==="lowest") return a.rating-b.rating;
    return 0;
  });

  const submitReview = () => {
    setRevFormErr("");
    if(!revForm.name.trim()){setRevFormErr("Please enter your name.");return;}
    if(!revForm.rating){setRevFormErr("Please select a star rating.");return;}
    if(!revForm.title.trim()){setRevFormErr("Please add a review title.");return;}
    if(revForm.body.trim().length<20){setRevFormErr("Please write at least 20 characters.");return;}
    const initials=revForm.name.trim().split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
    addReview(pkg.id,{name:revForm.name.trim(),location:revForm.location.trim()||"India",avatar:initials,rating:revForm.rating,title:revForm.title.trim(),body:revForm.body.trim(),verified:false});
    setRevSubmitted(true);
    setRevForm({name:"",location:"",email:"",rating:0,title:"",body:""});
    setShowForm(false);
    showToast("✅ Review submitted! It'll appear after approval.");
  };

  const handleBookThisTier = () => {
    const tierName = hasTiers && activeTier
      ? `${pkg.name} (${activeTier.days} Days – ${activeTier.label})`
      : pkg.name;
    go("booking", { name: tierName });
  };

  const whatsappEnquiry = () => {
    const tierInfo = hasTiers && activeTier ? ` — ${activeTier.days} Days (${activeTier.label})` : "";
    const msg = `🙏 Namaste! I'm interested in booking:\n\n*${pkg.name}${tierInfo}*\nDuration: ${displayDuration}\nPrice: ₹${Number(displayPrice).toLocaleString("en-IN")}/person\n\nPlease share more details. Thank you!`;
    window.open(`https://wa.me/919666962337?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ background:CREAM, paddingTop:68, minHeight:"100vh" }}>
      <div className="detail-page">
        <div className="back-btn" onClick={() => go("packages")}><I n="chevronL" s={16} c={ACC} /> Back to Packages</div>
        <div className="detail-hero">
          <img src={pkg.image} alt={pkg.name} />
          <div className="detail-hero-grad" />
          <div className="detail-hero-info">
            <div style={{ display:"inline-block",background:CAT_COLORS[pkg.category]||ACC,color:"#fff",fontSize:"0.68rem",fontWeight:700,padding:"4px 14px",borderRadius:50,marginBottom:"0.75rem" }}>{pkg.badge} · {pkg.category}</div>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,color:"#fff",lineHeight:1.1,marginBottom:"0.75rem" }}>{pkg.name}</h1>
            <div style={{ display:"flex",gap:"1.5rem",flexWrap:"wrap" }}>
              {[[pkg.destination+", "+pkg.state,"map"],[displayDuration,"clock"],[pkg.groupSize+" people","users"]].map(([v,ic]) => (
                <div key={v} style={{ display:"flex",alignItems:"center",gap:6,fontSize:"0.84rem",color:"rgba(255,255,255,0.85)" }}><I n={ic} s={14} c="rgba(255,255,255,0.65)" />{v}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            {hasTiers && (
              <div className="detail-sec">
                <h3>📅 Choose Your Duration</h3>
                <div className="tier-tabs">
                  {pkg.tiers.map(tier => (
                    <div key={tier.id} className={`tier-tab${activeTier?.id===tier.id?" active":""}`} onClick={()=>setActiveTier(tier)}>
                      <div className="tier-days">{tier.days} Days</div>
                      <span className="tier-label">{tier.label}</span>
                      <span className="tier-price">₹{Number(tier.price).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className={`tier-tab${activeTier===null?" active":""}`} onClick={()=>{ setActiveTier(null); go("custom-package"); }} style={{ background:"rgba(247,148,29,0.1)",borderColor:SAFFRON }}>
                    <div className="tier-days" style={{ fontSize:"1rem" }}>✨</div>
                    <span className="tier-label">Custom</span>
                    <span className="tier-price" style={{ color:SAFFRON }}>Get Quote</span>
                  </div>
                </div>
                {activeTier && (
                  <div className="tier-badge"><I n="check" s={14} c="#fff" /> {activeTier.days} Days / {activeTier.nights} Nights — {activeTier.label} selected</div>
                )}
              </div>
            )}

            <div className="detail-sec">
              <h3>✨ Trip Highlights</h3>
              {displayHighlights.map((h,i) => (
                <div key={i} className="hi-item"><I n="check" s={17} c={ACC} /><span>{h}</span></div>
              ))}
            </div>

            <div className="detail-sec">
              <h3>🗺️ Day-by-Day Itinerary</h3>
              {displayItinerary.map(d => (
                <div key={d.day} className="iti-item">
                  <div className="iti-day"><small>Day</small>{d.day}</div>
                  <div>
                    <div style={{ fontWeight:600,color:DARK,marginBottom:4,fontSize:"0.95rem" }}>{d.title}</div>
                    <div style={{ fontSize:"0.83rem",color:"#666",lineHeight:1.65 }}>{d.desc}</div>
                  </div>
                </div>
              ))}
              <p style={{ fontSize:"0.76rem",color:"#bbb",marginTop:"0.5rem" }}>Full detailed itinerary shared on booking confirmation</p>
            </div>

            <div className="detail-sec">
              <h3>🎁 What's Included</h3>
              {displayIncludes.map((inc,i) => (
                <div key={i} className="inc-item"><I n="check" s={15} c="#2e7d32" />{inc}</div>
              ))}
            </div>

            <div className="rev-section">
              <h3>⭐ Traveller Reviews <span style={{ fontFamily:"Outfit",fontSize:"0.85rem",color:"#aaa",fontWeight:400 }}>({pkgReviews.length} reviews)</span></h3>
              {pkgReviews.length > 0 && (
                <div className="rev-summary">
                  <div className="rev-big-score">
                    <div className="rev-big-num">{avgRating}</div>
                    <Stars r={Number(avgRating)} s={16} />
                    <div className="rev-big-label">{pkgReviews.length} reviews</div>
                  </div>
                  <div className="rev-bars">
                    {ratingCounts.map(({r,count,pct}) => (
                      <div key={r} className="rev-bar-row" style={{ cursor:"pointer" }} onClick={()=>setRevFilter(revFilter===String(r)?"All":String(r))}>
                        <div className="rev-bar-label">{r}★</div>
                        <div className="rev-bar-track"><div className="rev-bar-fill" style={{ width:`${pct}%`,background:revFilter===String(r)?ACC:SAFFRON }} /></div>
                        <div className="rev-bar-count">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pkgReviews.length > 0 && (
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",marginBottom:"1.5rem" }}>
                  <div className="rev-filter">
                    {["All","5","4","3","2","1"].map(f=>(
                      <button key={f} className={`rev-filter-btn${revFilter===f?" on":""}`} onClick={()=>setRevFilter(f)}>{f==="All"?"All Ratings":`${f} ★`}</button>
                    ))}
                  </div>
                  <select className="rev-sort" value={revSort} onChange={e=>setRevSort(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                </div>
              )}
              {pkgReviews.length===0 && <div style={{ textAlign:"center",padding:"2.5rem",color:"#bbb" }}><div style={{ fontSize:"2rem",marginBottom:"0.75rem" }}>✍️</div><div style={{ fontWeight:600,color:"#999" }}>No reviews yet</div><div style={{ fontSize:"0.85rem" }}>Be the first to share your experience!</div></div>}
              {filtered.map(r=>(
                <div key={r.id} className="rev-card">
                  <div className="rev-header">
                    <div className="rev-author">
                      <div className="rev-av">{r.avatar}</div>
                      <div>
                        <div className="rev-name">{r.name}</div>
                        <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginTop:3 }}>
                          <div className="rev-loc">{r.location}</div>
                          {r.verified&&<span className="rev-verified"><I n="check" s={10} c="#2e7d32"/>Verified Traveller</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}><Stars r={r.rating} s={15} /><div className="rev-date" style={{ marginTop:4 }}>{r.date}</div></div>
                  </div>
                  <div className="rev-title">{r.title}</div>
                  <div className="rev-body">{r.body}</div>
                  <button className="rev-helpful" onClick={()=>markHelpful(pkg.id,r.id)}><I n="check" s={13} c="#888"/>Helpful ({r.helpful})</button>
                </div>
              ))}
            </div>

            {revSubmitted ? (
              <div style={{ background:"#e8f5e9",border:"2px solid #c8e6c9",borderRadius:20,padding:"2rem",textAlign:"center",marginBottom:"1.5rem" }}>
                <div style={{ fontSize:"2.5rem",marginBottom:"0.75rem" }}>🙏</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#2e7d32",marginBottom:"0.5rem" }}>Thank you for your review!</div>
                <div style={{ fontSize:"0.85rem",color:"#4caf50",marginBottom:"1.25rem" }}>Your review will appear after approval.</div>
                <button className="btn" style={{ background:"#2e7d32",color:"#fff" }} onClick={()=>setRevSubmitted(false)}>Write Another Review</button>
              </div>
            ) : (
              <div className="write-rev">
                <h3>Write a Review</h3>
                <div className="write-rev-sub">Travelled with us? Share your experience.</div>
                {!showForm ? (
                  <button className="btn btn-primary" onClick={()=>setShowForm(true)}>✍️ Write a Review</button>
                ) : (
                  <div>
                    <div style={{ marginBottom:"1.25rem" }}>
                      <div style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.6)",marginBottom:"0.6rem",fontWeight:600 }}>Your Rating *</div>
                      <div className="star-picker">
                        {[1,2,3,4,5].map(s=>(
                          <button key={s} className="star-pick-btn" onMouseEnter={()=>setHoverStar(s)} onMouseLeave={()=>setHoverStar(0)} onClick={()=>setRevForm(f=>({...f,rating:s}))}>
                            <I n="star" s={32} c={(hoverStar||revForm.rating)>=s?"#FFB800":"rgba(255,255,255,0.2)"} stroke={false} />
                          </button>
                        ))}
                        {(hoverStar||revForm.rating)>0 && <span style={{ fontSize:"0.82rem",color:SAFFRON,marginLeft:8,alignSelf:"center",fontWeight:600 }}>{["","Terrible","Poor","Average","Good","Excellent!"][hoverStar||revForm.rating]}</span>}
                      </div>
                    </div>
                    <div className="rev-form-grid" style={{ marginBottom:"1rem" }}>
                      <div><div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Your Name *</div><input className="rev-inp" placeholder="e.g. Priya Sharma" value={revForm.name} onChange={e=>setRevForm(f=>({...f,name:e.target.value}))} /></div>
                      <div><div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>City / Location</div><input className="rev-inp" placeholder="e.g. Mumbai, Maharashtra" value={revForm.location} onChange={e=>setRevForm(f=>({...f,location:e.target.value}))} /></div>
                      <div style={{ gridColumn:"1/-1" }}><div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Email (private)</div><input className="rev-inp" type="email" placeholder="your@email.com" value={revForm.email} onChange={e=>setRevForm(f=>({...f,email:e.target.value}))} /></div>
                    </div>
                    <div style={{ marginBottom:"1rem" }}><div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Review Title *</div><input className="rev-inp" placeholder="e.g. An unforgettable pilgrimage!" value={revForm.title} onChange={e=>setRevForm(f=>({...f,title:e.target.value}))} /></div>
                    <div style={{ marginBottom:"1.25rem" }}><div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Your Review *</div><textarea className="rev-ta" rows={4} placeholder="Share your experience..." value={revForm.body} onChange={e=>setRevForm(f=>({...f,body:e.target.value}))} /><div style={{ fontSize:"0.7rem",color:revForm.body.length>=20?"rgba(255,255,255,0.35)":"#e57373",textAlign:"right",marginTop:4 }}>{revForm.body.length}/20 min</div></div>
                    {revFormErr && <div style={{ background:"rgba(229,57,53,0.15)",border:"1px solid rgba(229,57,53,0.4)",borderRadius:10,padding:"10px 14px",fontSize:"0.82rem",color:"#ff8a80",marginBottom:"1rem" }}>⚠️ {revFormErr}</div>}
                    <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                      <button className="btn btn-primary" onClick={submitReview}><I n="send" s={15} c="#fff"/>Submit Review</button>
                      <button className="btn" style={{ background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)" }} onClick={()=>{ setShowForm(false); setRevFormErr(""); setRevForm({name:"",location:"",email:"",rating:0,title:"",body:""}); }}>Cancel</button>
                    </div>
                    <div style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.3)",marginTop:"1rem" }}>🔒 Your email is never shown publicly.</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="sidebar-box">
            <div className="sb-from">Starting from</div>
            <div className="sb-price">₹{Number(displayPrice).toLocaleString("en-IN")}<small> / person</small></div>
            <div className="sb-orig">₹{Number(displayOrigPrice).toLocaleString("en-IN")}</div>
            <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:"1.5rem" }}>
              <Stars r={Number(avgRating)} s={14} />
              <span style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.5)" }}>{avgRating} ({pkgReviews.length} reviews)</span>
            </div>
            {[["Duration",displayDuration],["Group Size",pkg.groupSize],["Category",pkg.category],["Location",pkg.state]].map(([l,v]) => (
              <div key={l} className="sb-row"><span>{l}</span><span>{v}</span></div>
            ))}
            {hasTiers && activeTier && (
              <div style={{ background:"rgba(247,148,29,0.12)",border:"1px solid rgba(247,148,29,0.25)",borderRadius:10,padding:"0.85rem",marginTop:"1rem",marginBottom:"0.5rem" }}>
                <div style={{ fontSize:"0.72rem",color:SAFFRON,fontWeight:700,marginBottom:4 }}>Selected Plan</div>
                <div style={{ fontSize:"0.88rem",color:"#fff",fontWeight:600 }}>{activeTier.days} Days — {activeTier.label}</div>
              </div>
            )}
            <button className="btn btn-primary" style={{ width:"100%",justifyContent:"center",marginTop:"1.5rem",fontSize:"0.9rem" }} onClick={handleBookThisTier}>
              Book This Package <I n="arrow" s={15} c="#fff" />
            </button>
            <button className="cpb-wa-btn" style={{ width:"100%",justifyContent:"center",marginTop:"0.75rem" }} onClick={whatsappEnquiry}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp Enquiry
            </button>
            <button className="btn" style={{ width:"100%",justifyContent:"center",marginTop:"0.75rem",background:"rgba(255,255,255,0.08)",color:"#fff",fontSize:"0.87rem" }} onClick={()=>go("custom-package")}>
              ✨ Build Custom Package
            </button>
            <div style={{ marginTop:"1.25rem",padding:"1rem",background:"rgba(247,148,29,0.1)",borderRadius:10,border:"1px solid rgba(247,148,29,0.2)" }}>
              <div style={{ fontSize:"0.75rem",color:SAFFRON,fontWeight:600,marginBottom:"4px" }}>📞 Call Us Directly</div>
              <div style={{ fontSize:"0.9rem",color:"#fff",fontWeight:600 }}>{data.brand.phone}</div>
            </div>
            <div style={{ marginTop:"1rem",padding:"1rem",background:"rgba(255,255,255,0.06)",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",textAlign:"center" }}>
              <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:"0.5rem" }}>Travelled with us?</div>
              <button className="btn" style={{ background:SAFFRON,color:DARK,fontSize:"0.8rem",padding:"8px 18px",width:"100%",justifyContent:"center",fontWeight:700 }} onClick={()=>{ setShowForm(true); setTimeout(()=>document.querySelector(".write-rev")?.scrollIntoView({behavior:"smooth"}),100); }}>⭐ Rate this Package</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PkgDetailPage;
